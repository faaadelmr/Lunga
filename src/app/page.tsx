"use client";

import dynamic from 'next/dynamic';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';

const EditorPanel = dynamic(() => import("@/components/editor-panel").then(mod => mod.EditorPanel), { ssr: false });
const ResumePreviewPanel = dynamic(() => import("@/components/resume-preview-panel").then(mod => mod.ResumePreviewPanel), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-background overflow-hidden relative">
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[minmax(400px,2fr)_3fr]">
        <EditorPanel />
        <div className="hidden xl:block h-full overflow-hidden">
          <ResumePreviewPanel />
        </div>
      </div>

      {/* Floating Sticky Button for Mobile/Tablet Preview (< xl) */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-2xl gap-2 bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-200 px-5 py-6 font-semibold border-2 border-background"
            >
              <Eye className="w-5 h-5 animate-pulse" />
              <span>Preview CV</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl border-t border-border flex flex-col overflow-hidden">
            <SheetHeader className="sr-only">
              <SheetTitle>Pratinjau CV</SheetTitle>
              <SheetDescription>Tampilan pratinjau resume CV</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto">
              <ResumePreviewPanel />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
}


