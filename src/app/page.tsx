"use client";

import dynamic from 'next/dynamic';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { useResume } from '@/context/resume-context';

const EditorPanel = dynamic(() => import("@/components/editor-panel").then(mod => mod.EditorPanel), { ssr: false });
const ResumePreviewPanel = dynamic(() => import("@/components/resume-preview-panel").then(mod => mod.ResumePreviewPanel), { ssr: false });
const ResignPreviewPanel = dynamic(() => import("@/components/resign-preview-panel").then(mod => mod.ResignPreviewPanel), { ssr: false });

export default function Home() {
  const { activeMode } = useResume();
  const isResign = activeMode === 'resign';

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground relative">
      {/* 1. STATIONARY MAIN RESUME PAGE (Never moves!) */}
      <main className="h-full w-full relative">
        <div className="h-full w-full grid grid-cols-1 xl:grid-cols-[minmax(400px,2fr)_3fr]">
          <EditorPanel />
          <div className="hidden xl:block h-full overflow-hidden">
            <ResumePreviewPanel />
          </div>
        </div>
      </main>

      {/* 2. RESIGN BUILDER OVERLAY LAYER (Slides in from Left to Right over main page) */}
      <div
        className={`fixed inset-0 w-full h-full z-20 grid grid-cols-1 xl:grid-cols-[minmax(400px,2fr)_3fr] transition-transform duration-500 ease-in-out bg-gradient-to-br from-red-950 via-red-900 to-neutral-950 text-red-50 ${
          isResign ? 'translate-x-0 shadow-2xl' : '-translate-x-full pointer-events-none'
        }`}
      >
        <EditorPanel />
        <div className="hidden xl:block h-full overflow-hidden">
          <ResignPreviewPanel />
        </div>
      </div>

      {/* Floating Sticky Button for Mobile/Tablet Preview (< xl) */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={`rounded-full shadow-2xl gap-2 hover:scale-105 active:scale-95 transition-all duration-200 px-5 py-6 font-semibold border-2 ${
                isResign
                  ? 'bg-red-600 text-white border-red-400 hover:bg-red-700 shadow-red-950/80'
                  : 'bg-primary text-primary-foreground border-background'
              }`}
            >
              <Eye className="w-5 h-5 animate-pulse" />
              <span>{isResign ? 'Preview Surat Resign' : 'Preview CV'}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className={`h-[92vh] p-0 rounded-t-2xl border-t flex flex-col overflow-hidden ${
            isResign ? 'bg-red-950 border-red-900 text-red-50' : ''
          }`}>
            <SheetHeader className="sr-only">
              <SheetTitle>Pratinjau Dokumen</SheetTitle>
              <SheetDescription>Tampilan pratinjau resume / resign letter</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto">
              {isResign ? <ResignPreviewPanel /> : <ResumePreviewPanel />}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}


