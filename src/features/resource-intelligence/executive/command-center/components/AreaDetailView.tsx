'use client';

import React, { useMemo, useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import toast from 'react-hot-toast';
import { Panel } from '@/features/resource-intelligence/executive/command-center/components/Panel';
import { useDashboard, LayerKey } from '@/features/resource-intelligence/executive/command-center/DashboardContext';
import { AreaBreakdownItem, BREAKDOWN_PIN_OFFSETS, NODES, getAreaDetail } from '@/features/resource-intelligence/executive/command-center/data/locations';
import { Sparkline, TrendChart, Gauge, InsightIcon } from './MiniCharts';

const STAGE_COLORS: Record<LayerKey, string> = {
  generator: '#22c55e',
  collection: '#f59e0b',
  inspection: '#f97316',
  processing: '#3b82f6',
  utilization: '#8b5cf6',
  route: '#64748b',
};

const BREADCRUMB_STAGES: { key: LayerKey; label: string }[] = [
  { key: 'generator', label: 'Generator' },
  { key: 'collection', label: 'Collection' },
  { key: 'inspection', label: 'Inspection' },
  { key: 'processing', label: 'Processing' },
  { key: 'utilization', label: 'Utilization' },
];

const TIME_LABELS = [
  { label: 'Yesterday', sub: 'เมื่อวาน', days: -1 },
  { label: 'Today', sub: 'วันนี้', days: 0 },
  { label: 'Tomorrow', sub: 'พรุ่งนี้', days: 1 },
  { label: '+7 Days', sub: '7 วัน', days: 7 },
  { label: '+30 Days', sub: '30 วัน', days: 30 },
];

function CircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
}

function trendClass(pct: number) {
  return pct >= 0 ? 'text-green-500 font-semibold text-[0.8rem]' : 'text-red-500 font-semibold text-[0.8rem]';
}

function trendText(pct: number, unit = '%') {
  return `${pct >= 0 ? '↑' : '↓'} ${Math.abs(pct)}${unit}`;
}

function Donut({ items }: { items: AreaBreakdownItem[] }) {
  const gradient = useMemo(() => {
    const stops = items.reduce<{ text: string; acc: number }[]>((rows, item) => {
      const prevAcc = rows.length > 0 ? rows[rows.length - 1].acc : 0;
      const acc = prevAcc + item.pct;
      return [...rows, { text: `${item.color} ${prevAcc}% ${acc}%`, acc }];
    }, []);
    return `conic-gradient(${stops.map(s => s.text).join(', ')})`;
  }, [items]);

  const total = items.reduce((sum, i) => sum + i.tons, 0);

  return (
    <div className="relative w-[110px] h-[110px] rounded-full flex-shrink-0" style={{ background: gradient }}>
      <div className="absolute inset-3.5 bg-white rounded-full flex flex-col items-center justify-center">
        <span className="text-[1.35rem] font-bold">{total.toFixed(1)}</span>
        <span className="text-[0.65rem] text-slate-500">ตัน</span>
      </div>
    </div>
  );
}

export function AreaDetailView() {
  const { selectedAreaId, setSelectedArea } = useDashboard();
  const [activeTimeIndex, setActiveTimeIndex] = useState(1);
  // Parent mounts this component with key={selectedAreaId}, so this lazy
  // initializer re-runs and re-stamps "last updated" fresh on every area
  // switch, keeping state resets out of an effect (react-hooks/set-state-in-effect).
  const [lastUpdated] = useState(() => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));

  const node = useMemo(() => NODES.find(n => n.id === selectedAreaId), [selectedAreaId]);
  const area = selectedAreaId ? getAreaDetail(selectedAreaId) : undefined;

  const timelineSteps = useMemo(() => {
    const today = new Date();
    return TIME_LABELS.map(step => {
      const date = new Date(today);
      date.setDate(date.getDate() + step.days);
      return { ...step, date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) };
    });
  }, []);

  const trendDayLabels = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (5 - i));
      return d.getDate().toString();
    });
  }, []);

  if (!node || !area) return null;

  return (
    <div className="flex flex-1 gap-6 min-h-0">
      <aside className="w-80 flex flex-col gap-4 z-10 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-2 text-[0.8rem] font-semibold text-slate-500 cursor-pointer py-1 hover:text-blue-500" onClick={() => setSelectedArea(null)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          กลับสู่ภาพรวมจังหวัด
        </div>

        <Panel>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">พื้นที่</span>
              <span className="text-xl font-bold">{node.name}</span>
              <span className="text-xs text-slate-500">{node.id === 'phuket_town' ? 'Phuket Town' : node.id.charAt(0).toUpperCase() + node.id.slice(1)}</span>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: node.color }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            </div>
          </div>
        </Panel>

        <Panel title="ภาพรวมวันนี้" subtitle="Today's overview">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[0.8rem] text-slate-500 mb-1">Organic วันนี้</span>
              <div className="flex items-baseline justify-between">
                <span className="text-[1.75rem] font-bold">{area.todayTons.toFixed(1)} <span className="text-[0.9rem] font-medium text-slate-500">ตัน</span></span>
                <span className={trendClass(area.todayTrendPct)}>{trendText(area.todayTrendPct)}<span className="block text-[0.7rem] font-normal text-slate-500">จากเมื่อวาน</span></span>
              </div>
            </div>
            <div>
              <span className="text-[0.8rem] text-slate-500 mb-1">อัตราการแยกต้นทาง</span>
              <div className="flex items-baseline justify-between">
                <span className="text-[1.75rem] font-bold">{area.separationRatePct}<span className="text-[0.9rem] font-medium text-slate-500">%</span></span>
                <span className={trendClass(area.separationTrendPct)}>{trendText(area.separationTrendPct)}<span className="block text-[0.7rem] font-normal text-slate-500">จากเมื่อวาน</span></span>
              </div>
            </div>
            <div>
              <span className="text-[0.8rem] text-slate-500 mb-1">Organic Score</span>
              <div className="flex items-baseline justify-between">
                <span className="text-[1.75rem] font-bold">{area.organicScore}<span className="text-[0.9rem] font-medium text-slate-500"> /100</span></span>
                <span className={trendClass(area.organicScoreTrendPts)}>{trendText(area.organicScoreTrendPts, ' pt')}<span className="block text-[0.7rem] font-normal text-slate-500">จากสัปดาห์ที่แล้ว</span></span>
              </div>
            </div>
            <div>
              <span className="text-[0.8rem] text-slate-500 mb-1">แนวโน้ม 7 วัน</span>
              <div className="mt-1">
                <Sparkline data={area.weekTrend} color={node.color} />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="เปรียบเทียบกับค่าเฉลี่ยจังหวัด" subtitle="vs. Province average">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-[0.85rem]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#22c55e' }}><CircleIcon /></div>
                <span>ปริมาณ Organic</span>
              </div>
              <span className={trendClass(area.vsProvince.organicPct)}>{trendText(area.vsProvince.organicPct)}</span>
            </div>
            <div className="flex items-center justify-between text-[0.85rem]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#3b82f6' }}><CircleIcon /></div>
                <span>อัตราการแยกต้นทาง</span>
              </div>
              <span className={trendClass(area.vsProvince.separationPct)}>{trendText(area.vsProvince.separationPct)}</span>
            </div>
            <div className="flex items-center justify-between text-[0.85rem]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#f59e0b' }}><CircleIcon /></div>
                <span>Organic Score</span>
              </div>
              <span className={trendClass(area.vsProvince.organicScorePts)}>{trendText(area.vsProvince.organicScorePts, ' pt')}</span>
            </div>
          </div>
        </Panel>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 py-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          ข้อมูลล่าสุด {lastUpdated}
        </div>
      </aside>

      <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto z-10 [&::-webkit-scrollbar]:hidden">
        <Panel noPadding>
          <div className="flex items-center justify-between py-5 px-6">
            <div>
              <h2 className="text-[1.05rem] font-bold">รายละเอียดพื้นที่ {node.name}</h2>
              <p className="text-xs text-slate-500">Area detail — {node.name}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {BREADCRUMB_STAGES.map((stage, i) => (
                <React.Fragment key={stage.key}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: STAGE_COLORS[stage.key] }}><CircleIcon /></div>
                    <span className="text-xs font-semibold text-slate-500">{stage.label}</span>
                  </div>
                  {i < BREADCRUMB_STAGES.length - 1 && <span className="text-slate-400">›</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Panel>

        <div className="flex-1 min-h-[320px] relative rounded-2xl overflow-hidden shadow-md">
          <Map
            key={node.id}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{ longitude: node.lon, latitude: node.lat, zoom: 13.2 }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          >
            <Marker longitude={node.lon} latitude={node.lat} anchor="bottom">
              <div className="flex flex-col items-center pointer-events-none">
                <div className="w-[30px] h-[30px] rounded-full border-2 border-white flex items-center justify-center text-white shadow-md" style={{ backgroundColor: node.color }}><CircleIcon /></div>
                <div className="bg-white/95 py-[3px] px-2 rounded-sm shadow-sm mt-1.5 text-[0.7rem] font-bold text-slate-800 whitespace-nowrap">{area.todayTons.toFixed(1)} ตัน</div>
              </div>
            </Marker>
            {area.breakdown.map((item, i) => {
              const offset = BREAKDOWN_PIN_OFFSETS[i % BREAKDOWN_PIN_OFFSETS.length];
              return (
                <Marker key={item.key} longitude={node.lon + offset.dx} latitude={node.lat + offset.dy} anchor="bottom">
                  <div className="flex flex-col items-center pointer-events-none">
                    <div className="rounded-full border-2 border-white flex items-center justify-center text-white shadow-md" style={{ backgroundColor: item.color, width: 24, height: 24 }}><CircleIcon /></div>
                    <div className="bg-white/95 py-[3px] px-2 rounded-sm shadow-sm mt-1.5 text-[0.7rem] font-bold text-slate-800 whitespace-nowrap">{item.tons.toFixed(1)} ตัน</div>
                  </div>
                </Marker>
              );
            })}
          </Map>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-[4px] py-2 px-4 rounded-lg shadow-sm z-[5]">
            <div className="text-[1.1rem] font-bold">{node.name}</div>
            <div className="text-xs text-slate-500">{node.id === 'phuket_town' ? 'Phuket Town' : node.id.charAt(0).toUpperCase() + node.id.slice(1)}</div>
          </div>
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-[4px] flex flex-col items-center justify-center text-[0.65rem] font-bold text-slate-500 shadow-sm z-[5]">
            <span>N</span>
            <span>↑</span>
          </div>
        </div>

        <Panel noPadding>
          <div className="flex items-center justify-between py-4 px-6">
            <div className="w-[100px]">
              <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Time View</h2>
              <p className="text-xs text-slate-500">มุมมองเวลา</p>
            </div>
            <div className="flex-1 flex justify-between relative">
              <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-slate-200 z-[1]"></div>
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center z-[3] bg-white px-1.5 cursor-pointer" onClick={() => setActiveTimeIndex(i)}>
                  <div className={`w-3 h-3 rounded-full bg-slate-200 mb-1.5 ${i === activeTimeIndex ? 'bg-green-500' : ''}`}></div>
                  <span className={`text-[0.7rem] font-semibold ${i === activeTimeIndex ? 'text-slate-800' : 'text-slate-500'}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="grid grid-cols-4 gap-4">
          <Panel noPadding>
            <div className="flex items-center gap-2.5 pt-4 px-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: STAGE_COLORS.collection }}><CircleIcon /></div>
              <span className="text-[0.8rem] font-bold">การเก็บรวบรวม</span>
            </div>
            <div className="flex flex-col gap-3 pt-3 px-4 pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">เที่ยวรถเก็บ</span>
                  <span className={trendClass(area.collection.tripsTrendCount)}>{trendText(area.collection.tripsTrendCount, ' เที่ยว')}</span>
                </div>
                <span className="text-[1.1rem] font-bold">{area.collection.trips} เที่ยว</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">ปริมาณเก็บรวม</span>
                  <span className="text-[0.72rem] text-slate-500">{area.collection.coveragePct}% coverage</span>
                </div>
                <span className="text-[1.1rem] font-bold">{area.collection.tonsCollected.toFixed(1)} ตัน</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">เส้นทางที่ดำเนินการ</span>
                  <span className="text-[0.72rem] text-slate-500">{area.collection.routesActive}/{area.collection.routesTotal}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-canvas overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(area.collection.routesActive / area.collection.routesTotal) * 100}%`, backgroundColor: STAGE_COLORS.collection }}></div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel noPadding>
            <div className="flex items-center gap-2.5 pt-4 px-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: STAGE_COLORS.inspection }}><CircleIcon /></div>
              <span className="text-[0.8rem] font-bold">การตรวจคุณภาพ</span>
            </div>
            <div className="flex flex-col gap-3 pt-3 px-4 pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">ผ่านเกณฑ์</span>
                  <span className="text-[0.72rem] text-slate-500">{area.inspection.passedPct}%</span>
                </div>
                <span className="text-[1.1rem] font-bold">{area.inspection.passedTons.toFixed(1)} ตัน</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">ไม่ผ่านเกณฑ์</span>
                  <span className="text-[0.72rem] text-slate-500">{area.inspection.failedPct}%</span>
                </div>
                <span className="text-[1.1rem] font-bold">{area.inspection.failedTons.toFixed(1)} ตัน</span>
                <div className="w-full h-1.5 rounded-full bg-canvas overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${area.inspection.failedPct}%`, backgroundColor: '#ef4444' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.72rem] text-slate-500">ปัญหาที่พบ</span>
                <span className="text-[0.72rem] text-slate-500">{area.inspection.issues}</span>
              </div>
            </div>
          </Panel>

          <Panel noPadding>
            <div className="flex items-center gap-2.5 pt-4 px-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: STAGE_COLORS.processing }}><CircleIcon /></div>
              <span className="text-[0.8rem] font-bold">การแปรรูป</span>
            </div>
            <div className="flex flex-col gap-3 pt-3 px-4 pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">ส่งเข้าโรงงาน</span>
                  <span className={trendClass(area.processing.sentTrendPct)}>{trendText(area.processing.sentTrendPct)}</span>
                </div>
                <span className="text-[1.1rem] font-bold">{area.processing.sentTons.toFixed(1)} ตัน</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.72rem] text-slate-500">กำลังการผลิต</span>
                </div>
                <span className="text-[1.1rem] font-bold">{area.processing.capacityPct}%</span>
                <div className="w-full h-1.5 rounded-full bg-canvas overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${area.processing.capacityPct}%`, backgroundColor: STAGE_COLORS.processing }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.72rem] text-slate-500">คงเหลือรอแปรรูป</span>
                <span className="text-[1.1rem] font-bold">{area.processing.remainingTons.toFixed(1)} ตัน</span>
              </div>
            </div>
          </Panel>

          <Panel noPadding>
            <div className="flex items-center gap-2.5 pt-4 px-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: STAGE_COLORS.utilization }}><CircleIcon /></div>
              <span className="text-[0.8rem] font-bold">การใช้ประโยชน์</span>
            </div>
            <div className="flex flex-col gap-3 pt-3 px-4 pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[0.72rem] text-slate-500">ปุ๋ยอินทรีย์</span>
                <span className="text-[1.1rem] font-bold">{area.utilization.smartBinsTons.toFixed(1)} ตัน</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.72rem] text-slate-500">พลังงาน</span>
                <span className="text-[1.1rem] font-bold">{area.utilization.energyKwh.toLocaleString()} kWh</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.72rem] text-slate-500">วัตถุดิบอื่นๆ</span>
                <span className="text-[1.1rem] font-bold">{area.utilization.otherMaterialsTons.toFixed(1)} ตัน</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <aside className="w-80 flex flex-col gap-4 z-10 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden">
        <Panel>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">แหล่งกำเนิด (ตัน)</h2>
              <p className="text-xs text-slate-500 mb-4">Sources breakdown</p>
            </div>
            <span className="text-blue-500 text-xs cursor-pointer" onClick={() => toast('Loading full sources breakdown...', { icon: '📊' })}>ดูทั้งหมด</span>
          </div>
          <div className="flex items-center gap-5">
            <Donut items={area.breakdown} />
            <div className="flex flex-col gap-2 flex-1">
              {area.breakdown.map(item => (
                <div key={item.key} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold whitespace-nowrap">{item.tons.toFixed(1)} ({item.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">การแยกต้นทาง</h2>
              <p className="text-xs text-slate-500 mb-4">Source separation trend</p>
            </div>
            <span className="text-blue-500 text-xs cursor-pointer" onClick={() => toast('Loading trend detail...', { icon: '📈' })}>ดูแนวโน้ม</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[1.75rem] font-bold">{area.separationRatePct}%</span>
            <span className={trendClass(area.separationTrendPct)}>{trendText(area.separationTrendPct)} <span className="block text-[0.7rem] font-normal text-slate-500">จากเมื่อวาน</span></span>
          </div>
          <TrendChart data={area.separationTrend} labels={trendDayLabels} color={node.color} />
        </Panel>

        <Panel>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Organic Score</h2>
              <p className="text-xs text-slate-500 mb-4">คะแนนคุณภาพ Organic</p>
            </div>
            <span className="text-blue-500 text-xs cursor-pointer" onClick={() => toast('Loading score detail...', { icon: '🏆' })}>ดูรายละเอียด</span>
          </div>
          <div className="flex items-center justify-between">
            <Gauge score={area.organicScore} color={node.color} />
            <span className={trendClass(area.organicScoreTrendPts)}>{trendText(area.organicScoreTrendPts, ' pt')}<span className="block text-[0.7rem] font-normal text-slate-500">จากสัปดาห์ที่แล้ว</span></span>
          </div>
        </Panel>

        <Panel title={`AI INSIGHTS สำหรับ${node.name}`} subtitle={lastUpdated}>
          <div className="flex flex-col gap-3">
            {area.aiInsights.map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 bg-canvas rounded-lg">
                <InsightIcon type={insight.type} />
                <div className="flex flex-col">
                  <span className="text-[0.82rem] font-semibold">{insight.title}</span>
                  <span className="text-[0.72rem] text-slate-500">{insight.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
}
