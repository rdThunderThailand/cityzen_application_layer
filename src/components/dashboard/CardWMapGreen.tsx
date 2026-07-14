import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Layers, Plus, Minus, Crosshair, ChevronDown, ArrowRight } from 'lucide-react';
import mockMapGreenImage from '../../../public/mockmap2.png';

export type ReachBucketKey = 'ge80' | '60to80' | '40to60' | '20to40' | 'lt20';

// `fill` values below back the legend dots now, and are the exact hex values
// to plug into the future Mapbox `fill-color` match expression:
// ['step', ['get', 'reach_pct'], lt20 fill, 20, 20to40 fill, 40, 40to60 fill, 60, 60to80 fill, 80, ge80 fill]
const reachConfig: Record<ReachBucketKey, { label: string; dotClass: string; fill: string }> = {
    ge80: { label: '80% ขึ้นไป', dotClass: 'bg-emerald-800', fill: '#065F46' },
    '60to80': { label: '60% - 80%', dotClass: 'bg-emerald-600', fill: '#059669' },
    '40to60': { label: '40% - 60%', dotClass: 'bg-emerald-400', fill: '#34D399' },
    '20to40': { label: '20% - 40%', dotClass: 'bg-emerald-200', fill: '#A7F3D0' },
    lt20: { label: 'ต่ำกว่า 20%', dotClass: 'bg-emerald-50 ring-1 ring-inset ring-emerald-200', fill: '#ECFDF5' },
};

const defaultBucketOrder: ReachBucketKey[] = ['ge80', '60to80', '40to60', '20to40', 'lt20'];

export interface ReachRegionData {
    id: string;            // region/subdistrict code — will match a feature id in GeoJSON later
    name: string;
    bucket: ReachBucketKey;
}

// Kept as a stable contract so a real MapViewMapbox implementation can be
// dropped in later without touching CardWMapGreen's JSX or prop wiring.
export interface ReachViewProps {
    regions: ReachRegionData[];
    center?: [number, number];   // [lng, lat] — Phuket default [98.3381, 7.8804]
    zoom?: number;               // default 10
    onRegionClick?: (region: ReachRegionData) => void;
}

export interface ReachViewHandle {
    zoomIn: () => void;
    zoomOut: () => void;
    locate: () => void;          // mock: reset scale; Mapbox later: flyTo user location
}

export interface CardWMapGreenProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    legendTitle?: string;
    channelLabel?: string;
    buckets?: ReachBucketKey[];
    regions?: ReachRegionData[];
    center?: [number, number];
    zoom?: number;
    onRegionClick?: (region: ReachRegionData) => void;
    onChannelChange?: () => void;
    onViewDistricts?: () => void;
}

const demoReachRegions: ReachRegionData[] = [
    { id: 'kathu', name: 'กะทู้', bucket: 'ge80' },
    { id: 'patong', name: 'ป่าตอง', bucket: '60to80' },
    { id: 'kamala', name: 'กมลา', bucket: '40to60' },
    { id: 'thalang', name: 'ถลาง', bucket: '20to40' },
    { id: 'rawai', name: 'ราไวย์', bucket: 'lt20' },
    { id: 'chalong', name: 'ฉลอง', bucket: '40to60' },
    { id: 'mueang', name: 'เมืองภูเก็ต', bucket: 'ge80' },
    { id: 'kata', name: 'กะตะ', bucket: '20to40' },
    { id: 'sakoo', name: 'สาคู', bucket: 'lt20' },
    { id: 'kohkeaw', name: 'เกาะแก้ว', bucket: '60to80' },
    { id: 'wichit', name: 'วิชิต', bucket: '60to80' },
    { id: 'karon', name: 'กะรน', bucket: '20to40' },
];

// TODO(mapbox): replace MapViewMockGreen with MapViewMapbox (react-map-gl).
// Keep ReachViewProps/ReachViewHandle identical. Token via import.meta.env.VITE_MAPBOX_TOKEN.
// Choropleth: fill-color = ['step', ['get','reach_pct'], ...reachConfig fills].
const MapViewMockGreen = forwardRef<ReachViewHandle, ReachViewProps>(function MapViewMockGreen(_props, ref) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        zoomIn: () => setScale((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2))),
        zoomOut: () => setScale((prev) => Math.max(0.6, +(prev - 0.25).toFixed(2))),
        locate: () => setScale(1),
    }), []);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-slate-50">
            <img
                src={mockMapGreenImage.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
            />
        </div>
    );
});

export function CardWMapGreen({
    title = "แผนที่การกระจายการรับสาร (Reach Map)",
    legendTitle = "เปอร์เซ็นต์การเข้าถึง",
    channelLabel = "LINE OA",
    buckets = defaultBucketOrder,
    regions = demoReachRegions,
    center = [98.3381, 7.8804],
    zoom = 10,
    onRegionClick,
    onChannelChange,
    onViewDistricts,
    className,
    ...props
}: CardWMapGreenProps) {
    const mapRef = useRef<ReachViewHandle>(null);

    const handleRegionClick = (region: ReachRegionData) => {
        if (onRegionClick) {
            onRegionClick(region);
        } else {
            console.log(`[CardWMapGreen Mock Action] Region clicked: ${region.name} (${reachConfig[region.bucket].label})`);
        }
    };

    const handleChannelChange = () => {
        if (onChannelChange) {
            onChannelChange();
        } else {
            console.log(`[CardWMapGreen Mock Action] Channel selector clicked (current: ${channelLabel})`);
        }
    };

    const handleViewDistricts = () => {
        if (onViewDistricts) {
            onViewDistricts();
        } else {
            console.log('[CardWMapGreen Mock Action] View districts clicked');
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

            <div className="relative flex-1 min-h-[160px] bg-slate-50">
                <MapViewMockGreen
                    ref={mapRef}
                    regions={regions}
                    center={center}
                    zoom={zoom}
                    onRegionClick={handleRegionClick}
                />

                <div className="absolute top-4 left-4 flex flex-col items-start gap-3">
                    <button
                        type="button"
                        onClick={handleChannelChange}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <span className="truncate">{channelLabel}</span>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>

                    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5">
                        <span className="text-sm font-semibold text-slate-800">{legendTitle}</span>
                        {buckets.map((key) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", reachConfig[key].dotClass)} />
                                <span className="text-sm text-slate-600">
                                    {reachConfig[key].label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="เลเยอร์แผนที่"
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <Layers className="w-5 h-5" />
                </button>

                <div className="absolute right-4 bottom-16 flex flex-col gap-2">
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
                </div>

                <button
                    type="button"
                    onClick={handleViewDistricts}
                    className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 px-4 py-2.5 bg-white rounded-full shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <span className="whitespace-nowrap">ดูรายอำเภอ</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
            </div>
        </div>
    );
}

export default CardWMapGreen;
