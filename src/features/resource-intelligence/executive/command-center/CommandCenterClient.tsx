'use client';
import { Toaster } from "react-hot-toast";

import React from 'react';
import { Header } from '@/features/resource-intelligence/executive/command-center/components/Header';
import { SidebarLeft } from '@/features/resource-intelligence/executive/command-center/components/SidebarLeft';
import { MainMapArea } from '@/features/resource-intelligence/executive/command-center/components/MainMapArea';
import { SidebarRight } from '@/features/resource-intelligence/executive/command-center/components/SidebarRight';
import { AreaDetailView } from '@/features/resource-intelligence/executive/command-center/components/AreaDetailView';
import { ActiveMissionsView } from '@/features/resource-intelligence/executive/command-center/components/ActiveMissionsView';
import { StatusFooter } from '@/features/resource-intelligence/executive/command-center/components/StatusFooter';
import { DashboardProvider, useDashboard } from '@/features/resource-intelligence/executive/command-center/DashboardContext';

function DashboardLayout() {
  const { leftSidebarVisible, rightSidebarVisible, selectedAreaId, missionsViewActive } = useDashboard();
  const isOverview = !selectedAreaId && !missionsViewActive;

  return (
    <div className="flex flex-col h-dvh overflow-hidden bg-canvas text-slate-800">
      <Header />

      <main className="flex flex-1 p-6 gap-6 overflow-hidden min-h-0 bg-[#e5f0f9] bg-[radial-gradient(#d1e4f3_1px,transparent_1px)] bg-[length:20px_20px]">
        {missionsViewActive ? (
          <ActiveMissionsView />
        ) : selectedAreaId ? (
          <AreaDetailView key={selectedAreaId} />
        ) : (
          <>
            {leftSidebarVisible && <SidebarLeft />}
            <MainMapArea />
            {rightSidebarVisible && <SidebarRight />}
          </>
        )}
      </main>

      {isOverview && (
        <div className="px-6 pb-6 flex-shrink-0 bg-[#e5f0f9]">
          <StatusFooter />
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default function CommandCenterClient() {
  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
}
