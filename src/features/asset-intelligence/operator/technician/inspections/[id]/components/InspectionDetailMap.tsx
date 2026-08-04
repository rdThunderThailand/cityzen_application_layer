"use client";

import { Car, Info, MapPin, Navigation } from "lucide-react";
import { InspectionOrder, InspectionOrderPatch } from "../types";
import Map, { Layer, Marker, NavigationControl, Source } from "./MockMap";

interface InspectionDetailMapProps {
  inspectionOrder: InspectionOrder;
  advanceStatus: (patch?: InspectionOrderPatch) => void;
}

export function InspectionDetailMap({ inspectionOrder, advanceStatus }: InspectionDetailMapProps) {
  const routeCoords = inspectionOrder.route;

  const startCoords = routeCoords[0];
  const destCoords = routeCoords[routeCoords.length - 1];

  const routeGeoJSON = {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: routeCoords
    }
  };

  // Pick a midpoint for the camera and time pill
  const midIndex = Math.floor(routeCoords.length / 2);
  const midLng = routeCoords[midIndex][0];
  const midLat = routeCoords[midIndex][1];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-[15px] font-black text-slate-800 mb-2">ตำแหน่งหน้างาน</h3>
          <p className="text-[14px] font-bold text-slate-700 leading-snug">{inspectionOrder.location}</p>
          <p className="text-[12px] font-medium text-slate-500 mt-1">
            {inspectionOrder.addressLine}
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-blue-600 font-bold hover:bg-slate-50 transition-colors shrink-0 bg-white">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[12px]">เปิดใน Google Maps</span>
        </button>
      </div>

      {/* Real Mapbox Map Area */}
      <div className="w-full h-[280px] bg-slate-100 rounded-xl relative overflow-hidden mb-6 border border-slate-200 shadow-inner group">
        <Map
          initialViewState={{
            longitude: midLng,
            latitude: midLat,
            zoom: 13.5,
            pitch: 0,
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
          attributionControl={false}
        >
          {/* Navigation Controls */}
          <NavigationControl position="bottom-right" showCompass={false} />

          {/* Route Line with realistic casing */}
          <Source id="route-source" type="geojson" data={routeGeoJSON}>
            <Layer
              id="route-layer-casing"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{ "line-color": "#ffffff", "line-width": 8 }}
            />
            <Layer
              id="route-layer"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{ "line-color": "#2563EB", "line-width": 5 }}
            />
          </Source>

          {/* Start Point Marker (Blue dot) */}
          <Marker longitude={startCoords[0]} latitude={startCoords[1]} anchor="center">
            <div className="w-5 h-5 bg-blue-600 rounded-full border-[3px] border-white shadow-md"></div>
          </Marker>

          {/* Destination Point Marker (Red Pin with Popup) */}
          <Marker longitude={destCoords[0]} latitude={destCoords[1]} anchor="bottom">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 mb-1 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-800">หน้างาน</h4>
                  <p className="text-[11px] font-bold text-slate-500 whitespace-nowrap">{inspectionOrder.location}</p>
                </div>
              </div>
              {/* Custom triangle pointer */}
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white relative drop-shadow-sm"></div>
            </div>
          </Marker>

          {/* Estimated Time Pill (Middle of route) */}
          <Marker longitude={midLng} latitude={midLat} anchor="center">
            <div className="bg-white px-3 py-1.5 rounded-full shadow-md border border-slate-200 flex flex-col items-center mt-6">
              <span className="text-[12px] font-black text-blue-700">ประมาณ {inspectionOrder.travelMinutes} นาที</span>
              <span className="text-[10px] font-bold text-slate-500">({inspectionOrder.distanceKm} กม.)</span>
            </div>
          </Marker>
        </Map>
      </div>

      <div className="flex flex-col gap-3">
        <div className="mb-1">
          <h4 className="text-[15px] font-black text-slate-800 mb-1">เริ่มเดินทางไปหน้างาน</h4>
          <p className="text-[12px] font-medium text-slate-500">
            กดปุ่มด้านล่างเพื่อเริ่มเดินทาง ระบบจะติดตามตำแหน่งและคำนวณเวลาโดยประมาณ
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-3">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>การติดตามตำแหน่งจะทำงานเฉพาะระหว่างเวลาปฏิบัติงานเท่านั้น</span>
          <Info className="w-3 h-3 text-slate-300 ml-1 cursor-pointer" />
        </div>

        <div className="grid grid-cols-[1.5fr_1fr] gap-3">
          <button onClick={() => advanceStatus()} className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] text-[14px] font-bold transition-colors shadow-sm shadow-blue-200">
            <Car className="w-4 h-4" />
            <span>เริ่มเดินทาง</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-blue-600 rounded-[12px] text-[14px] font-bold transition-colors shadow-sm">
            <Navigation className="w-4 h-4" />
            <span>นำทางด้วยแผนที่</span>
          </button>
        </div>
      </div>
    </div>
  );
}
