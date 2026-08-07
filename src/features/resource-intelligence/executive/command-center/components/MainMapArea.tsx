'use client';

import React, { useRef, useEffect, useState } from 'react';
import Map, { Source, Layer, Marker, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import toast from 'react-hot-toast';
import { Panel } from '@/features/resource-intelligence/executive/command-center/components/Panel';
import { LayerKey, useDashboard } from '@/features/resource-intelligence/executive/command-center/DashboardContext';
import { NODES } from '@/features/resource-intelligence/executive/command-center/data/locations';

const HUB_ID = 'phuket_town';
const hub = NODES.find(n => n.id === HUB_ID)!;

// Samples a quadratic bezier between two points, offset perpendicular to the
// straight line at the midpoint, so hub->node connectors read as gentle
// curves instead of straight spokes.
function curvedLine(from: [number, number], to: [number, number], bend = 0.18, steps = 20): [number, number][] {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
    const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
    points.push([x, y]);
  }
  return points;
}

// Curved connector from the hub node to every other node, colored by the
// destination node's own accent so hiding a layer hides its connector too.
const CONNECTORS = {
  type: 'FeatureCollection',
  features: NODES.filter(n => n.id !== HUB_ID).map(node => ({
    type: 'Feature',
    properties: { color: node.color, layerKey: node.type },
    geometry: { type: 'LineString', coordinates: curvedLine([hub.lon, hub.lat], [node.lon, node.lat]) },
  })),
};

// Ant path animation sequence for line-dasharray
const dashArraySeq = [
  [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5],
  [3, 4, 0], [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2],
  [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5]
];

const TIMELINE_OFFSETS = [
  { label: 'Yesterday', sub: 'เมื่อวาน', days: -1 },
  { label: 'Today', sub: 'วันนี้', days: 0 },
  { label: 'Tomorrow', sub: 'พรุ่งนี้', days: 1 },
  { label: '+7 Days', sub: '7 วันข้างหน้า', days: 7 },
  { label: '+30 Days', sub: '30 วันข้างหน้า', days: 30 },
];

const BREADCRUMB_COLORS: Record<LayerKey, string> = {
  generator: '#22c55e',
  collection: '#f59e0b',
  inspection: '#f97316',
  processing: '#3b82f6',
  utilization: '#8b5cf6',
  route: '#64748b',
};

const BREADCRUMB_STAGES: { key: LayerKey; label: string; labelTh: string }[] = [
  { key: 'generator', label: 'Generator', labelTh: 'แหล่งกำเนิด' },
  { key: 'collection', label: 'Collection', labelTh: 'การเก็บรวบรวม' },
  { key: 'inspection', label: 'Inspection', labelTh: 'การตรวจคุณภาพ' },
  { key: 'processing', label: 'Processing', labelTh: 'การแปรรูป' },
  { key: 'utilization', label: 'Utilization', labelTh: 'การใช้ประโยชน์' },
];

const LAYER_TOGGLE_ITEMS: { id: LayerKey; label: string; color: string }[] = [
  { id: 'generator', label: 'แหล่งกำเนิด (Generator)', color: '#22c55e' },
  { id: 'collection', label: 'การเก็บรวบรวม (Collection)', color: '#f59e0b' },
  { id: 'inspection', label: 'การตรวจคุณภาพ (Inspection)', color: '#f97316' },
  { id: 'processing', label: 'การแปรรูป (Processing)', color: '#3b82f6' },
  { id: 'utilization', label: 'การใช้ประโยชน์ (Utilization)', color: '#8b5cf6' },
  { id: 'route', label: 'เส้นทาง (Route)', color: '#64748b' },
];

function StageIcon({ type }: { type: LayerKey }) {
  if (type === 'generator') {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>;
  }
  if (type === 'collection') {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="14" height="12"></rect><path d="M15 8h4l3 3v4h-7z"></path><circle cx="6" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle></svg>;
  }
  if (type === 'inspection') {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
  }
  if (type === 'processing') {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 21V9l6 4V9l6 4V9l6 4v8Z"></path><path d="M2 21h20"></path></svg>;
  }
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
}

export function MainMapArea() {
  const mapRef = useRef<MapRef>(null);
  const [activeTimeIndex, setActiveTimeIndex] = useState(1);
  const [layerPopoverOpen, setLayerPopoverOpen] = useState(false);
  const { simulationActive, setSimulation, layers, setLayer, flyToRequest, setSelectedArea } = useDashboard();

  const timelineSteps = React.useMemo(() => {
    const today = new Date();
    return TIMELINE_OFFSETS.map(step => {
      const date = new Date(today);
      date.setDate(date.getDate() + step.days);
      return {
        ...step,
        date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      };
    });
  }, []);

  useEffect(() => {
    if (!simulationActive || !layers.route) return;

    let step = 0;
    let animationId: number;

    const animateDashArray = () => {
      const map = mapRef.current?.getMap();
      if (map && map.isStyleLoaded()) {
        const newStep = parseInt(((performance.now() / 50) % dashArraySeq.length).toString(), 10);
        if (newStep !== step) {
          try {
            map.setPaintProperty('routes-layer', 'line-dasharray', dashArraySeq[newStep]);
            step = newStep;
          } catch {
            // Layer might not be added yet
          }
        }
      }
      animationId = requestAnimationFrame(animateDashArray);
    };

    animationId = requestAnimationFrame(animateDashArray);
    return () => cancelAnimationFrame(animationId);
  }, [simulationActive, layers.route]);

  useEffect(() => {
    if (!flyToRequest) return;
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.flyTo({
      center: [flyToRequest.lon, flyToRequest.lat],
      zoom: flyToRequest.zoom,
      duration: 2000,
      essential: true,
    });
  }, [flyToRequest]);

  const handleSimulation = () => {
    const next = !simulationActive;
    setSimulation(next);
    toast.success(next ? 'Simulation Started!' : 'Simulation Stopped', { icon: next ? '🚀' : '⏹️' });
  };

  const visibleNodes = NODES.filter(node => layers[node.type as keyof typeof layers]);
  const visibleConnectors = React.useMemo(() => ({
    ...CONNECTORS,
    features: CONNECTORS.features.filter(f => layers[f.properties.layerKey as keyof typeof layers]),
  }), [layers]);

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto z-10 [&::-webkit-scrollbar]:hidden">
      <Panel noPadding>
        <div className="py-5 px-6 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 text-green-500 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Organic Resource Flow</h2>
              <p className="text-xs text-slate-500 mb-4">การไหลของทรัพยากรอินทรีย์</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {BREADCRUMB_STAGES.map((stage, i) => (
              <React.Fragment key={stage.key}>
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: BREADCRUMB_COLORS[stage.key] }}>
                    <StageIcon type={stage.key} />
                  </div>
                  <div className="flex flex-col leading-[1.1]">
                    <span className="text-xs font-semibold text-slate-800">{stage.labelTh}</span>
                    <span className="text-[0.65rem] text-slate-500">{stage.label}</span>
                  </div>
                </div>
                {i < BREADCRUMB_STAGES.length - 1 && <span className="text-slate-400">›</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Panel>

      <div className="flex-1 min-h-[340px] relative rounded-2xl overflow-hidden shadow-md">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{ longitude: 98.34, latitude: 7.91, zoom: 10.5 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
        >
          {/* Connector Source and Layer */}
          {layers.route && visibleConnectors.features.length > 0 && (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Source id="routes" type="geojson" data={visibleConnectors as any}>
              <Layer
                id="routes-layer"
                type="line"
                paint={{
                  'line-color': ['get', 'color'],
                  'line-width': 3,
                  'line-opacity': 0.7,
                  'line-dasharray': [0, 4, 3]
                }}
              />
            </Source>
          )}

          {/* Interactive Markers */}
          {visibleNodes.map(node => (
            <Marker key={node.id} longitude={node.lon} latitude={node.lat} anchor="center">
              <div
                className="group relative flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedArea(node.id)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 rounded-full animate-marker-pulse pointer-events-none" style={{ borderColor: node.color }}></div>
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md z-[2] transition-transform duration-200 group-hover:scale-[1.2]" style={{ backgroundColor: node.color }}>
                  <StageIcon type={node.type} />
                </div>
                <div className="bg-white/95 backdrop-blur-[4px] py-1 px-2 rounded-sm shadow-sm mt-2 text-center whitespace-nowrap pointer-events-none">
                  <div className="text-xs font-bold text-slate-800">{node.name}</div>
                  <div className="text-[0.7rem] text-slate-500">{node.val}</div>
                </div>
              </div>
            </Marker>
          ))}
        </Map>

        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-[4px] flex flex-col items-center justify-center text-[0.65rem] font-bold text-slate-500 shadow-sm z-[5]">
          <span>N</span>
          <span>↑</span>
        </div>

        <div className="absolute top-16 right-4 flex flex-col gap-2.5 z-[5]">
          <button
            type="button"
            className={`w-9 h-9 rounded-full bg-white/95 border-0 shadow-sm text-slate-500 flex items-center justify-center cursor-pointer hover:text-slate-800 ${layerPopoverOpen ? 'bg-blue-500 text-white hover:text-white' : ''}`}
            title="เลเยอร์แผนที่"
            onClick={() => setLayerPopoverOpen(v => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/95 border-0 shadow-sm text-slate-500 flex items-center justify-center cursor-pointer hover:text-slate-800"
            title="ตัวกรอง"
            onClick={() => toast('Advanced filters coming soon', { icon: '🔎' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/95 border-0 shadow-sm text-slate-500 flex items-center justify-center cursor-pointer hover:text-slate-800"
            title="เต็มจอ"
            onClick={() => toast('Fullscreen view coming soon', { icon: '⛶' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
          </button>
        </div>

        {layerPopoverOpen && (
          <>
            <div className="absolute inset-0 z-[6]" onClick={() => setLayerPopoverOpen(false)}></div>
            <div className="absolute top-16 right-[62px] w-[260px] bg-white rounded-2xl shadow-lg p-4 z-[7]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between text-[0.8rem] font-bold mb-3">
                <span>เลเยอร์แผนที่</span>
                <span className="cursor-pointer text-slate-500 text-xs" onClick={() => setLayerPopoverOpen(false)}>✕</span>
              </div>
              <div className="flex flex-col gap-3">
                {LAYER_TOGGLE_ITEMS.map(layer => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: layer.color }}></div>
                      <span className="text-[0.78rem] font-medium">{layer.label}</span>
                    </div>
                    <div
                      className="w-9 h-[18px] rounded-[10px] relative cursor-pointer flex-shrink-0"
                      style={{ backgroundColor: layers[layer.id] ? layer.color : '#cbd5e1' }}
                      onClick={() => setLayer(layer.id, !layers[layer.id])}
                    >
                      <div
                        className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 right-0.5"
                        style={{ transform: layers[layer.id] ? 'translateX(0)' : 'translateX(-20px)' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <Panel noPadding>
          <div className="pt-5 px-6">
            <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Key Impacts Today</h2>
            <p className="text-xs text-slate-500 mb-4">ผลกระทบและคุณค่าที่เกิดขึ้นวันนี้</p>
          </div>
          <div className="grid grid-cols-5 gap-4 p-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                <span className="text-xs text-slate-500">CO2 Avoided</span>
              </div>
              <div className="text-[1.4rem] font-bold flex items-baseline gap-1">52 <span className="text-[0.8rem] font-medium text-slate-500">ตัน</span></div>
              <span className="text-green-500 text-xs font-semibold">↑ 12%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
                <span className="text-xs text-slate-500">Methane Avoided</span>
              </div>
              <div className="text-[1.4rem] font-bold flex items-baseline gap-1">12.8 <span className="text-[0.8rem] font-medium text-slate-500">ตัน</span></div>
              <span className="text-green-500 text-xs font-semibold">↑ 9%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span className="text-xs text-slate-500">Revenue Potential</span>
              </div>
              <div className="text-[1.4rem] font-bold flex items-baseline gap-1">185,000 <span className="text-[0.8rem] font-medium text-slate-500">บาท</span></div>
              <span className="text-green-500 text-xs font-semibold">↑ 15%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><ellipse cx="12" cy="13" rx="8" ry="6"></ellipse><circle cx="16" cy="12" r="1" fill="#22c55e"></circle><path d="M12 7V4"></path><path d="M4 12H2"></path></svg>
                <span className="text-xs text-slate-500">Cost Saving</span>
              </div>
              <div className="text-[1.4rem] font-bold flex items-baseline gap-1">245,000 <span className="text-[0.8rem] font-medium text-slate-500">บาท</span></div>
              <span className="text-green-500 text-xs font-semibold">↑ 11%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                <span className="text-xs text-slate-500">Circular Rate</span>
              </div>
              <div className="text-[1.4rem] font-bold flex items-baseline gap-1">45 <span className="text-[0.8rem] font-medium text-slate-500">%</span></div>
              <span className="text-green-500 text-xs font-semibold">↑ 5%</span>
            </div>
          </div>
        </Panel>

        <Panel noPadding>
          <div className="flex items-center justify-between py-4 px-6">
            <div className="w-[120px]">
              <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Time View</h2>
              <p className="text-xs text-slate-500 mb-4">มุมมองเวลา</p>
            </div>

            <div className="flex-1 flex justify-between relative mr-12">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200 z-[1]"></div>
              <div className="absolute top-6 left-0 h-0.5 bg-green-500 z-[2] transition-[width] duration-300 ease-in-out" style={{ width: `${(activeTimeIndex / 4) * 100}%` }}></div>

              {timelineSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center z-[3] bg-white px-2 cursor-pointer"
                  onClick={() => setActiveTimeIndex(i)}
                >
                  <span className={`text-xs font-semibold mb-2 ${i === activeTimeIndex ? 'text-slate-800' : 'text-slate-500'}`}>{step.label}</span>
                  <span className="text-[10px] text-slate-500 mb-2">{step.date}</span>
                  <div className={`w-3 h-3 rounded-full bg-slate-200 ${i === activeTimeIndex ? 'bg-green-500' : ''}`}></div>
                </div>
              ))}
            </div>

            <button
              className={`flex items-center gap-2 py-3 px-6 bg-canvas border border-green-500 rounded-lg text-green-500 font-semibold text-sm cursor-pointer transition-all duration-200 hover:bg-green-100 ${simulationActive ? 'bg-green-500 text-white hover:bg-green-500' : ''}`}
              onClick={handleSimulation}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              {simulationActive ? 'STOP SIMULATION' : 'SCENARIO SIMULATION'}
              <div className="flex flex-col text-left ml-2">
                <span className="text-[10px] text-slate-500 font-normal">จำลองสถานการณ์</span>
              </div>
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
