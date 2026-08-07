'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { LAYER_KEYS, LayerKey, useDashboard } from '@/features/resource-intelligence/executive/command-center/DashboardContext';
import { LOCATION_ALIASES, NODES } from '../data/locations';
import { getProvinceSummaryText } from '../data/province';

export type VoiceLang = 'th-TH' | 'en-US';

interface SpeechRecognitionEventLike {
  results: { [index: number]: { [index: number]: { transcript: string } }; length: number };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// Command grammar: independently detect a state (on/off) and a target,
// then combine. Keeps the phrase list small while covering EN + TH phrasing.
const ON_KEYWORDS = ['turn on', 'switch on', 'show', 'open', 'enable', 'start', 'เปิด', 'เริ่ม'];
const OFF_KEYWORDS = ['turn off', 'switch off', 'hide', 'close', 'disable', 'stop', 'ปิด', 'หยุด'];

const SIMULATION_KEYWORDS = ['simulation', 'จำลอง'];
const LEFT_KEYWORDS = ['left panel', 'left sidebar', 'left', 'แผงซ้าย', 'ด้านซ้าย', 'ซ้าย'];
const RIGHT_KEYWORDS = ['right panel', 'right sidebar', 'right', 'แผงขวา', 'ด้านขวา', 'ขวา'];
const ALL_LAYERS_KEYWORDS = ['all layers', 'layers', 'เลเยอร์ทั้งหมด', 'เลเยอร์'];
const GOTO_KEYWORDS = ['go to', 'fly to', 'navigate to', 'take me to', 'zoom to', 'zoom', 'ไปที่', 'ไปยัง', 'บินไปที่', 'ซูมไป', 'ซูม'];
const CLOSE_AREA_KEYWORDS = ['back to overview', 'close area', 'province overview', 'กลับสู่ภาพรวม', 'ภาพรวมจังหวัด', 'กลับไปภาพรวม'];
const ACTIVE_MISSIONS_KEYWORDS = ['active mission', 'active missions', 'show missions', 'ภารกิจที่กำลังดำเนินการ', 'ภารกิจ'];
const SUMMARY_KEYWORDS = ['summary', 'summarize', 'สรุปสถานการณ์', 'สรุป'];

const LAYER_ALIASES: Record<LayerKey, string[]> = {
  generator: ['generator', 'source', 'แหล่งกำเนิด'],
  collection: ['collection', 'เก็บรวบรวม'],
  inspection: ['inspection', 'quality', 'ตรวจคุณภาพ'],
  processing: ['processing', 'แปรรูป'],
  utilization: ['utilization', 'ใช้ประโยชน์'],
  route: ['route', 'routes', 'เส้นทาง'],
};

function matchesAny(transcript: string, keywords: string[]) {
  return keywords.some(k => transcript.includes(k));
}

export function useVoiceCommands() {
  const dashboard = useDashboard();

  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState<VoiceLang>('th-TH');
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const runCommand = useCallback((rawTranscript: string) => {
    const transcript = rawTranscript.trim().toLowerCase();
    setLastCommand(rawTranscript);
    const ctx = dashboard;

    if (matchesAny(transcript, GOTO_KEYWORDS)) {
      const destination = NODES.find(node => matchesAny(transcript, LOCATION_ALIASES[node.id]));
      if (destination) {
        ctx.flyTo(destination.lon, destination.lat, 13.5);
        ctx.setSelectedArea(destination.id);
        toast.success(`Flying to ${destination.name}`, { icon: '🧭' });
      } else {
        toast.error(`Don't know that place: "${rawTranscript}"`);
      }
      return;
    }

    if (matchesAny(transcript, ACTIVE_MISSIONS_KEYWORDS)) {
      ctx.setMissionsView(true);
      toast.success('Opening Active Missions', { icon: '🎯' });
      return;
    }

    if (matchesAny(transcript, CLOSE_AREA_KEYWORDS)) {
      ctx.setSelectedArea(null);
      ctx.setMissionsView(false);
      toast.success('Back to province overview', { icon: '🗺️' });
      return;
    }

    if (matchesAny(transcript, SUMMARY_KEYWORDS)) {
      toast(getProvinceSummaryText(), { icon: '📋', duration: 5000 });
      return;
    }

    const isOn = matchesAny(transcript, ON_KEYWORDS);
    const isOff = matchesAny(transcript, OFF_KEYWORDS);

    if (isOn === isOff) {
      toast.error(`Command not understood: "${rawTranscript}"`);
      return;
    }
    const desired = isOn;

    if (matchesAny(transcript, SIMULATION_KEYWORDS)) {
      ctx.setSimulation(desired);
      toast.success(`Simulation ${desired ? 'started' : 'stopped'}`, { icon: desired ? '▶️' : '⏹️' });
      return;
    }
    if (matchesAny(transcript, LEFT_KEYWORDS)) {
      ctx.setLeftSidebar(desired);
      toast.success(`Left panel ${desired ? 'shown' : 'hidden'}`);
      return;
    }
    if (matchesAny(transcript, RIGHT_KEYWORDS)) {
      ctx.setRightSidebar(desired);
      toast.success(`Right panel ${desired ? 'shown' : 'hidden'}`);
      return;
    }
    if (matchesAny(transcript, ALL_LAYERS_KEYWORDS)) {
      ctx.setAllLayers(desired);
      toast.success(`All map layers ${desired ? 'shown' : 'hidden'}`);
      return;
    }
    const layerKey = LAYER_KEYS.find(key => matchesAny(transcript, LAYER_ALIASES[key]));
    if (layerKey) {
      ctx.setLayer(layerKey, desired);
      toast.success(`Layer "${layerKey}" ${desired ? 'shown' : 'hidden'}`);
      return;
    }

    toast.error(`No matching target for: "${rawTranscript}"`);
  }, [dashboard]);

  const startListening = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      toast.error('Voice commands are not supported in this browser. Try Chrome or Edge.');
      return;
    }
    recognitionRef.current?.stop();

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        toast.error('Microphone access denied.');
      } else if (event.error === 'no-speech') {
        toast('No speech detected, try again.', { icon: '🤔' });
      } else {
        toast.error(`Voice error: ${event.error}`);
      }
    };
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      runCommand(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [lang, runCommand]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  return { listening, lang, setLang, lastCommand, startListening, stopListening, runCommand };
}
