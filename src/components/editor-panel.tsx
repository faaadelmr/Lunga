"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeForm } from "./editor/resume-form";
import { StylePanel } from "./editor/style-panel";
import { AiAssistPanel } from "./editor/ai-assist-panel";
import { FileText, Palette, Wand2, Globe } from "lucide-react";
import { useResume } from "@/context/resume-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Language } from "@/lib/types";
import { t } from "@/lib/translations";

export function EditorPanel() {
  const { selectedLanguage, setSelectedLanguage } = useResume();

  return (
    <div className="flex flex-col h-full min-h-0 bg-card border-r shadow-lg xl:shadow-none">
      <header className="p-6 border-b flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">Lunga</h1>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
            <SelectTrigger className="w-[145px] h-9 text-xs font-medium border-muted-foreground/20">
              <Globe className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="en" className="text-xs">🇺🇸 English</SelectItem>
              <SelectItem value="id" className="text-xs">🇮🇩 Indonesia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
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
    </div>
  );
}
