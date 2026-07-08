import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { MapPin, Map as MapIcon, ChevronDown } from 'lucide-react';

export interface MapMarker {
    id: string;
    lat: number;
    lng: number;
    label?: string;
}

export interface CardWMapProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    filterOptions: { value: string; label: string }[];
    onFilterChange?: (value: string) => void;
    markers?: MapMarker[];
    center?: [number, number];
    zoom?: number;
}

const defaultMockMarkers: MapMarker[] = [
    { id: '1', lat: 13.7563, lng: 100.5018, label: 'จุดคัดแยกขยะ สีลม' },
    { id: '2', lat: 13.7650, lng: 100.5380, label: 'จุดคัดแยกขยะ สุขุมวิท' },
    { id: '3', lat: 13.7440, lng: 100.4900, label: 'จุดคัดแยกขยะ บางรัก' },
    { id: '4', lat: 13.7800, lng: 100.5550, label: 'จุดคัดแยกขยะ ห้วยขวาง' },
    { id: '5', lat: 13.7300, lng: 100.5230, label: 'จุดคัดแยกขยะ สาทร' },
];

export function CardWMap({
    title = "heatmap",
    filterOptions = [{ value: "date", label: "date" }, { value: "week", label: "week" }, { value: "month", label: "month" }],
    onFilterChange,
    markers = defaultMockMarkers,
    center = [13.7563, 100.5018],
    zoom = 12,
    className,
    ...props
}: CardWMapProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectFilter = (option: { value: string; label: string }) => {
        setSelectedFilter(option);
        setIsFilterOpen(false);
        if (onFilterChange) {
            onFilterChange(option.value);
        } else {
            console.log(`[CardWMap Mock Action] Filter changed: ${option.label} (${option.value})`);
        }
    };

    const [centerLat, centerLng] = center;
    const lngSpan = 360 / Math.pow(2, zoom - 1);
    const latSpan = lngSpan * 0.6;

    const projectedMarkers = markers.map((marker) => {
        const dx = marker.lng - centerLng;
        const dy = marker.lat - centerLat;
        const xPercent = Math.min(96, Math.max(4, 50 + (dx / lngSpan) * 100));
        const yPercent = Math.min(96, Math.max(4, 50 - (dy / latSpan) * 100));
        return { ...marker, xPercent, yPercent };
    });

    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm w-full max-w-2xl font-sans",
                className
            )}
            {...props}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                        <MapIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 truncate">{title}</h3>
                </div>

                <div ref={filterRef} className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded-lg shadow-xs text-slate-700 hover:bg-slate-50 transition-all duration-200 select-none cursor-pointer",
                            isFilterOpen && "border-emerald-500 ring-2 ring-emerald-500/20"
                        )}
                    >
                        <span className="truncate max-w-[120px]">{selectedFilter?.label ?? 'Filter'}</span>
                        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0", isFilterOpen && "rotate-180")} />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 mt-1.5 w-40 bg-white border border-gray-300 rounded-lg shadow-sm z-20 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                            <ul className="max-h-48 overflow-y-auto scrollbar-none">
                                {filterOptions.map((option) => (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectFilter(option)}
                                            className={cn(
                                                "w-full px-3 py-2 text-left text-xs transition-colors duration-150 select-none cursor-pointer",
                                                selectedFilter?.value === option.value
                                                    ? "bg-emerald-50/80 text-emerald-600 font-semibold"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {projectedMarkers.map((marker) => (
                    <div
                        key={`glow-${marker.id}`}
                        className="absolute w-20 h-20 rounded-full bg-emerald-400/25 blur-xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ left: `${marker.xPercent}%`, top: `${marker.yPercent}%` }}
                    />
                ))}

                {projectedMarkers.map((marker) => (
                    <div
                        key={marker.id}
                        className="group absolute -translate-x-1/2 -translate-y-full"
                        style={{ left: `${marker.xPercent}%`, top: `${marker.yPercent}%` }}
                    >
                        <MapPin
                            className="w-6 h-6 text-emerald-600 drop-shadow-sm cursor-pointer"
                            fill="white"
                        />
                        {marker.label && (
                            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[11px] text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                                {marker.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">Markers</span>
                    <span className="font-semibold text-slate-800">{markers.length}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">Center</span>
                    <span className="font-semibold text-slate-800">
                        {centerLat.toFixed(4)}, {centerLng.toFixed(4)}
                    </span>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                    <span className="text-slate-500">Zoom</span>
                    <span className="font-semibold text-slate-800">{zoom}x</span>
                </div>
            </div>
        </div>
    );
}

export default CardWMap;
