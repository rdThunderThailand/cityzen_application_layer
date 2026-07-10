import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Layers, Plus, Minus, Crosshair, Maximize } from 'lucide-react';
import mockMapImage from '../../../public/mockmap.png';

export type MapSeverityKey = 'critical' | 'high_risk' | 'watch' | 'normal' | 'no_data';

// `fill` values below back the legend dots now, and are the exact hex values
// to plug into the future Mapbox `fill-color` match expression:
// ['match', ['get', 'severity'], 'critical', fill, 'high_risk', fill, ... , no_data fill]
const severityConfig: Record<MapSeverityKey, { label: string; dotClass: string; fill: string }> = {
    critical: { label: 'วิกฤต', dotClass: 'bg-rose-500', fill: '#F87171' },
    high_risk: { label: 'เสี่ยงสูง', dotClass: 'bg-orange-500', fill: '#FB923C' },
    watch: { label: 'เฝ้าระวัง', dotClass: 'bg-amber-400', fill: '#FBBF24' },
    normal: { label: 'ปกติ', dotClass: 'bg-emerald-500', fill: '#4ADE80' },
    no_data: { label: 'ไม่มีข้อมูล', dotClass: 'bg-slate-300', fill: '#E7EDDD' },
};

const defaultSeverityOrder: MapSeverityKey[] = ['critical', 'high_risk', 'watch', 'normal', 'no_data'];

export interface MapRegionData {
    id: string;            // region/subdistrict code — will match a feature id in GeoJSON later
    name: string;
    severity: MapSeverityKey;
}

// Kept as a stable contract so a real MapViewMapbox implementation can be
// dropped in later without touching CardWMap's JSX or prop wiring.
export interface MapViewProps {
    regions: MapRegionData[];
    center?: [number, number];   // [lng, lat] — Phuket default [98.3381, 7.8804]
    zoom?: number;               // default 10
    onRegionClick?: (region: MapRegionData) => void;
}

export interface MapViewHandle {
    zoomIn: () => void;
    zoomOut: () => void;
    locate: () => void;          // mock: reset scale; Mapbox later: flyTo user location
    toggleFullscreen: () => void;
}

export interface CardWMapProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    legendTitle?: string;
    severities?: MapSeverityKey[];
    regions?: MapRegionData[];
    center?: [number, number];
    zoom?: number;
    onRegionClick?: (region: MapRegionData) => void;
}

const demoRegions: MapRegionData[] = [
    { id: 'kathu', name: 'กะทู้', severity: 'critical' },
    { id: 'patong', name: 'ป่าตอง', severity: 'critical' },
    { id: 'kamala', name: 'กมลา', severity: 'high_risk' },
    { id: 'thalang', name: 'ถลาง', severity: 'watch' },
    { id: 'rawai', name: 'ราไวย์', severity: 'normal' },
    { id: 'chalong', name: 'ฉลอง', severity: 'normal' },
    { id: 'mueang', name: 'เมืองภูเก็ต', severity: 'watch' },
    { id: 'kata', name: 'กะตะ', severity: 'watch' },
    { id: 'sakoo', name: 'สาคู', severity: 'no_data' },
    { id: 'kohkeaw', name: 'เกาะแก้ว', severity: 'no_data' },
    { id: 'wichit', name: 'วิชิต', severity: 'no_data' },
    { id: 'karon', name: 'กะรน', severity: 'no_data' },
];

// TODO(mapbox): replace MapViewMock with MapViewMapbox (react-map-gl).
// Keep MapViewProps/MapViewHandle identical. Token via import.meta.env.VITE_MAPBOX_TOKEN.
// Choropleth: fill-color = ['match', ['get','severity'], ...severityConfig fills, no_data fill].
const MapViewMock = forwardRef<MapViewHandle, MapViewProps>(function MapViewMock(_props, ref) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        zoomIn: () => setScale((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2))),
        zoomOut: () => setScale((prev) => Math.max(0.6, +(prev - 0.25).toFixed(2))),
        locate: () => setScale(1),
        toggleFullscreen: () => {
            if (!document.fullscreenElement) {
                containerRef.current?.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        },
    }), []);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-sky-100">
            <img
                src={mockMapImage.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
            />
            {/* <span className="pointer-events-none absolute bottom-2 right-2 text-[10px] text-slate-400/70">
                MOCK MAP
            </span> */}
        </div>
    );
});

export function CardWMap({
    title = "แผนที่สถานการณ์สำคัญ",
    legendTitle = "ระดับความรุนแรง",
    severities = defaultSeverityOrder,
    regions = demoRegions,
    center = [98.3381, 7.8804],
    zoom = 10,
    onRegionClick,
    className,
    ...props
}: CardWMapProps) {
    const mapRef = useRef<MapViewHandle>(null);

    const handleRegionClick = (region: MapRegionData) => {
        if (onRegionClick) {
            onRegionClick(region);
        } else {
            console.log(`[CardWMap Mock Action] Region clicked: ${region.name} (${region.severity})`);
        }
    };

    return (
        <div
            className={cn(
                "bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col w-full max-w-2xl font-sans",
                className
            )}
            {...props}
        >
            <div className="px-5 py-4">
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
            </div>

            <div className="relative flex-1 min-h-[160px] bg-sky-100">
                <MapViewMock
                    ref={mapRef}
                    regions={regions}
                    center={center}
                    zoom={zoom}
                    onRegionClick={handleRegionClick}
                />

                <div className="absolute top-4 left-4 bg-white rounded-xl shadow-md p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5">
                    <span className="text-sm font-semibold text-slate-800">{legendTitle}</span>
                    {severities.map((key) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", severityConfig[key].dotClass)} />
                            <span className={cn("text-sm", key === 'no_data' ? "text-slate-400" : "text-slate-600")}>
                                {severityConfig[key].label}
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    aria-label="เลเยอร์แผนที่"
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <Layers className="w-5 h-5" />
                </button>

                <div className="absolute right-4 bottom-4 flex flex-col gap-2">
                    <button
                        type="button"
                        aria-label="ซูมเข้า"
                        onClick={() => mapRef.current?.zoomIn()}
                        className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="ซูมออก"
                        onClick={() => mapRef.current?.zoomOut()}
                        className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="ตำแหน่งปัจจุบัน"
                        onClick={() => mapRef.current?.locate()}
                        className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <Crosshair className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="เต็มจอ"
                        onClick={() => mapRef.current?.toggleFullscreen()}
                        className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <Maximize className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardWMap;
