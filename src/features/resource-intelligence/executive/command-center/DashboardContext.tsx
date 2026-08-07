'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type LayerKey = 'generator' | 'collection' | 'inspection' | 'processing' | 'utilization' | 'route';

export const LAYER_KEYS: LayerKey[] = ['generator', 'collection', 'inspection', 'processing', 'utilization', 'route'];

export interface FlyToRequest {
  lon: number;
  lat: number;
  zoom: number;
  requestId: number;
}

interface DashboardState {
  simulationActive: boolean;
  setSimulation: (visible: boolean) => void;
  leftSidebarVisible: boolean;
  setLeftSidebar: (visible: boolean) => void;
  rightSidebarVisible: boolean;
  setRightSidebar: (visible: boolean) => void;
  layers: Record<LayerKey, boolean>;
  setLayer: (key: LayerKey, visible: boolean) => void;
  setAllLayers: (visible: boolean) => void;
  flyToRequest: FlyToRequest | null;
  flyTo: (lon: number, lat: number, zoom?: number) => void;
  selectedAreaId: string | null;
  setSelectedArea: (id: string | null) => void;
  missionsViewActive: boolean;
  setMissionsView: (active: boolean) => void;
}

const DashboardContext = createContext<DashboardState | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [simulationActive, setSimulationActive] = useState(false);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    generator: true,
    collection: true,
    inspection: true,
    processing: true,
    utilization: true,
    route: true,
  });

  const setSimulation = useCallback((visible: boolean) => setSimulationActive(visible), []);
  const setLeftSidebar = useCallback((visible: boolean) => setLeftSidebarVisible(visible), []);
  const setRightSidebar = useCallback((visible: boolean) => setRightSidebarVisible(visible), []);
  const setLayer = useCallback((key: LayerKey, visible: boolean) => {
    setLayers(prev => ({ ...prev, [key]: visible }));
  }, []);
  const setAllLayers = useCallback((visible: boolean) => {
    setLayers(prev => {
      const next = { ...prev };
      LAYER_KEYS.forEach(key => { next[key] = visible; });
      return next;
    });
  }, []);

  const [flyToRequest, setFlyToRequest] = useState<FlyToRequest | null>(null);
  const flyToRequestCounter = useRef(0);
  const flyTo = useCallback((lon: number, lat: number, zoom = 13) => {
    flyToRequestCounter.current += 1;
    setFlyToRequest({ lon, lat, zoom, requestId: flyToRequestCounter.current });
  }, []);

  // These two full-screen views are mutually exclusive: opening one closes
  // the other, so only one ever replaces the map+sidebars layout at a time.
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [missionsViewActive, setMissionsViewActive] = useState(false);
  const setSelectedArea = useCallback((id: string | null) => {
    setSelectedAreaId(id);
    if (id !== null) setMissionsViewActive(false);
  }, []);
  const setMissionsView = useCallback((active: boolean) => {
    setMissionsViewActive(active);
    if (active) setSelectedAreaId(null);
  }, []);

  const value = useMemo<DashboardState>(() => ({
    simulationActive,
    setSimulation,
    leftSidebarVisible,
    setLeftSidebar,
    rightSidebarVisible,
    setRightSidebar,
    layers,
    setLayer,
    setAllLayers,
    flyToRequest,
    flyTo,
    selectedAreaId,
    setSelectedArea,
    missionsViewActive,
    setMissionsView,
  }), [simulationActive, setSimulation, leftSidebarVisible, setLeftSidebar, rightSidebarVisible, setRightSidebar, layers, setLayer, setAllLayers, flyToRequest, flyTo, selectedAreaId, setSelectedArea, missionsViewActive, setMissionsView]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within a DashboardProvider');
  return ctx;
}
