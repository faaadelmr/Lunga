"use client";

import dynamic from 'next/dynamic';
import Footer from "@/components/footer";

const EditorPanel = dynamic(() => import("@/components/editor-panel").then(mod => mod.EditorPanel), { ssr: false });
const ResumePreviewPanel = dynamic(() => import("@/components/resume-preview-panel").then(mod => mod.ResumePreviewPanel), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[minmax(400px,2fr)_3fr]">
        <EditorPanel />
        <ResumePreviewPanel />
      </div>
      <Footer />
    </main>
  );
}
