"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeForm } from "./editor/resume-form";
import { StylePanel } from "./editor/style-panel";
import { AiAssistPanel } from "./editor/ai-assist-panel";
import { ResignForm } from "./editor/resign-form";
import { FileText, Palette, Wand2, Globe, RotateCcw, Pickaxe } from "lucide-react";
import { RedDevilIcon } from "@/components/ui/red-devil-icon";
import { useResume } from "@/context/resume-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Language } from "@/lib/types";
import { t } from "@/lib/translations";
import { Button } from "@/components/ui/button";

interface EditorPanelProps {
  isFlipped?: boolean;
  onToggleFlip?: () => void;
}

export function EditorPanel({ isFlipped = false, onToggleFlip }: EditorPanelProps) {
  const { selectedLanguage, setSelectedLanguage, activeMode, setActiveMode } = useResume();

  const handleToggle = () => {
    setActiveMode(activeMode === 'resume' ? 'resign' : 'resume');
    if (onToggleFlip) onToggleFlip();
  };

  const isResign = activeMode === 'resign';

  return (
    <div className={`flex flex-col h-full min-h-0 border-r shadow-lg xl:shadow-none transition-colors duration-500 relative ${
      isResign ? 'bg-red-950/90 text-red-50 border-red-900/60' : 'bg-card border-border'
    }`}>
      {/* Side Panel Dock Handle Button (Left Edge Side Tab) */}
      <div className="absolute top-20 left-0 z-30">
        <Button
          onClick={handleToggle}
          variant="destructive"
          size="sm"
          title={isResign ? 'Switch to Resume CV' : 'Switch to Resign Builder'}
          className={`group h-9 rounded-r-full rounded-l-none font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 ease-in-out flex items-center border-none p-0 px-2.5 hover:px-4 overflow-hidden ${
            isResign
              ? 'bg-neutral-900 hover:bg-black text-red-400 hover:text-red-300 shadow-red-950/90'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/60'
          }`}
        >
          {isResign ? (
            <FileText className="w-4.5 h-4.5 text-white shrink-0" />
          ) : (
            <RedDevilIcon className="w-4.5 h-4.5 text-white shrink-0" />
          )}
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden group-hover:ml-2">
            {isResign ? 'RESUME CV' : 'RESIGN!!'}
          </span>
        </Button>
      </div>

      <header className={`p-6 border-b flex items-center justify-between transition-colors duration-500 ${
        isResign ? 'border-red-900/60 bg-red-900/20' : 'border-border'
      }`}>
        <div>
          <h1 className={`text-2xl font-headline font-extrabold flex items-center gap-2 ${
            isResign ? 'text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'text-primary'
          }`}>
            {isResign && <RedDevilIcon className="w-6 h-6 text-red-500" />}
            {isResign ? 'Lunga Resign Builder' : 'Lunga'}
          </h1>
          <p className={`text-xs mt-0.5 ${isResign ? 'text-red-300/80 font-medium' : 'text-muted-foreground'}`}>
            {isResign
              ? t(selectedLanguage, 'resignBuilderDesc')
              : t(selectedLanguage, 'appDescription')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
            <SelectTrigger className={`w-[145px] h-9 text-xs font-medium ${
              isResign ? 'border-red-800 bg-red-900/40 text-red-100' : 'border-muted-foreground/20'
            }`}>
              <Globe className={`h-3.5 w-3.5 mr-1.5 ${isResign ? 'text-red-300' : 'text-muted-foreground'}`} />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent align="end" className={isResign ? 'bg-red-950 border-red-900 text-red-100' : ''}>
              <SelectItem value="en" className="text-xs">🇺🇸 English</SelectItem>
              <SelectItem value="id" className="text-xs">🇮🇩 Indonesia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {isResign ? (
        <ScrollArea className="flex-1">
          <div className="p-6">
            <ResignForm />
          </div>
        </ScrollArea>
      ) : (
        <Tabs defaultValue="ai-assist" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ai-assist"><Wand2 className="mr-2 h-4 w-4" /> {t(selectedLanguage, 'aiReWrite')}</TabsTrigger>
              <TabsTrigger value="content"><FileText className="mr-2 h-4 w-4" /> {t(selectedLanguage, 'content')}</TabsTrigger>
              <TabsTrigger value="style"><Palette className="mr-2 h-4 w-4" /> {t(selectedLanguage, 'style')}</TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="ai-assist" className="mt-0">
                <AiAssistPanel />
              </TabsContent>
              <TabsContent value="content" className="mt-0">
                <ResumeForm />
              </TabsContent>
              <TabsContent value="style" className="mt-0">
                <StylePanel />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      )}
    </div>
  );
}
