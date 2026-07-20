
"use client";

import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Font, Template, Language } from "@/lib/types";
import { useState, useRef, useLayoutEffect } from "react";
import { ProfessionalTemplatePreview } from "../templates/professional-template";
import { ModernTemplatePreview } from "../templates/modern-template";
import { ClassicTemplatePreview } from "../templates/classic-template";
import { CreativeTemplatePreview } from "../templates/creative-template";
import { SwissTemplatePreview } from "../templates/swiss-template";
import { ElegantTemplatePreview } from "../templates/elegant-template";
import { TimelineTemplatePreview } from "../templates/timeline-template";
import { SmartStartTemplatePreview } from "../templates/smart-start-template";
import { VektoristikTemplatePreview } from "../templates/vektoristik-template";
import { AwesomeTemplatePreview } from "../templates/awesome-template";
import { CooperTemplatePreview } from "../templates/cooper-template";
import { QueteTemplatePreview } from "../templates/quete-template";
import { DiamondTemplatePreview } from "../templates/diamond-template";
import { HexagonvyTemplatePreview } from "../templates/hexagonvy-template";
import { StarlightTemplatePreview } from "../templates/starlight-template";
import { ConstructTemplatePreview } from "../templates/construct-template";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LedgerTemplatePreview } from "../templates/ledger-template";
import { BloxTemplatePreview } from "../templates/blox-template";
import { AtsFriendlyTemplatePreview } from "../templates/ats-friendly-template";
import { GitFolioTemplatePreview } from "../templates/git-folio-template";
import { GlassmorphismTemplatePreview } from "../templates/glassmorphism-template";
import { DeveloperCliTemplatePreview } from "../templates/developer-cli-template";
import { NeoBrutalistTemplatePreview } from "../templates/neo-brutalist-template";

const templates: { id: Template, name: string, component: React.FC<any> }[] = [
  { id: 'glassmorphism', name: 'Glassmorphism', component: GlassmorphismTemplatePreview },
  { id: 'developer-cli', name: 'Developer CLI', component: DeveloperCliTemplatePreview },
  { id: 'neo-brutalist', name: 'Neo-Brutalist', component: NeoBrutalistTemplatePreview },
  { id: 'git-folio', name: 'Git-folio', component: GitFolioTemplatePreview },
  { id: 'ats-friendly', name: 'ATS Friendly', component: AtsFriendlyTemplatePreview },
  { id: 'blox', name: 'Blox', component: BloxTemplatePreview },
  { id: 'ledger', name: 'Ledger', component: LedgerTemplatePreview },
  { id: 'construct', name: 'Construct', component: ConstructTemplatePreview },
  { id: 'starlight', name: 'Starlight', component: StarlightTemplatePreview },
  { id: 'hexagonvy', name: 'Hexagonvy', component: HexagonvyTemplatePreview },
  { id: 'diamond', name: 'Diamond', component: DiamondTemplatePreview },
  { id: 'cooper', name: 'Cooper', component: CooperTemplatePreview },
  { id: 'awesome', name: 'Awesome', component: AwesomeTemplatePreview },
  { id: 'timeline', name: 'Timeline', component: TimelineTemplatePreview },
  { id: 'smart-start', name: 'SmartStart', component: SmartStartTemplatePreview },
  { id: 'vektoristik', name: 'Vektoristik', component: VektoristikTemplatePreview },
  { id: 'quete', name: 'Quete', component: QueteTemplatePreview },
  { id: 'elegant', name: 'Elegant', component: ElegantTemplatePreview },
  { id: 'professional', name: 'Professional', component: ProfessionalTemplatePreview },
  { id: 'modern', name: 'Modern', component: ModernTemplatePreview },
  { id: 'classic', name: 'Classic', component: ClassicTemplatePreview },
  { id: 'creative', name: 'Creative', component: CreativeTemplatePreview },
  { id: 'swiss', name: 'Swiss', component: SwissTemplatePreview },
];

const accentColors = [
  { id: 'white', value: '#FFFFFF', name: 'White' },
  { id: 'ivory', value: '#FFFFF0', name: 'Ivory' },
  { id: 'light-gray', value: '#F5F5F5', name: 'Light Gray' },
  { id: 'beige', value: '#F5F5DC', name: 'Beige' },
  { id: 'light-blue', value: '#E6F0FF', name: 'Light Blue' },
  { id: 'black', value: '#1F2937', name: 'Black' },
  { id: 'midnight-blue', value: '#2c3e50', name: 'Midnight Blue' },
  { id: 'slate-gray', value: '#708090', name: 'Slate Gray' },
  { id: 'dusty-blue', value: '#6A89CC', name: 'Dusty Blue' },
  { id: 'teal', value: '#008080', name: 'Teal' },
  { id: 'forest-green', value: '#2D572C', name: 'Forest Green' },
  { id: 'burnt-sienna', value: '#e55a32', name: 'Burnt Sienna' },
  { id: 'crimson', value: '#990000', name: 'Crimson' },
  { id: 'royal-purple', value: '#6a0dad', name: 'Royal Purple' },
  { id: 'amethyst', value: '#9b59b6', name: 'Amethyst' },
  { id: 'soft-lavender', value: '#BCA0DC', name: 'Soft Lavender' },
  { id: 'coral-pink', value: '#F88379', name: 'Coral Pink' },
  { id: 'sunflower', value: '#f1c40f', name: 'Sunflower' },
  { id: 'mustard-yellow', value: '#ffdb58', name: 'Mustard Yellow' },
  { id: 'emerald', value: '#2ecc71', name: 'Emerald' },
  { id: 'charcoal', value: '#34495e', name: 'Charcoal' },
  { id: 'deep-ocean', value: '#005f73', name: 'Deep Ocean' },
];

const textColors = [
  { id: 'black', value: '#1F2937', name: 'Black' },
  { id: 'gray', value: '#4B5563', name: 'Gray' },
  { id: 'slate', value: '#475569', name: 'Slate' },
  { id: 'white', value: '#FFFFFF', name: 'White' },
  { id: 'stone', value: '#F5F5F4', name: 'Stone' },
]

const bgColors = [
  { id: 'white', value: '#FFFFFF', name: 'White' },
  { id: 'ivory', value: '#FFFFF0', name: 'Ivory' },
  { id: 'light-gray', value: '#F5F5F5', name: 'Light Gray' },
  { id: 'beige', value: '#F5F5DC', name: 'Beige' },
  { id: 'light-blue', value: '#E6F0FF', name: 'Light Blue' },
  { id: 'black', value: '#1F2937', name: 'Black' },
  { id: 'dark-charcoal', value: '#2C2C2C', name: 'Dark Charcoal' },
  { id: 'navy', value: '#1A2A45', name: 'Navy' },
];


const fonts: { id: Font; name: string }[] = [
  { id: 'Lato', name: 'Lato' },
  { id: 'Inter', name: 'Inter' },
  { id: 'Space Grotesk', name: 'Space Grotesk' },
  { id: 'Roboto', name: 'Roboto' },
  { id: 'Montserrat', name: 'Montserrat' },
  { id: 'Open Sans', name: 'Open Sans' },
  { id: 'Merriweather', name: 'Merriweather' },
  { id: 'Source Sans Pro', name: 'Source Sans Pro' },
  { id: 'Playfair Display', name: 'Playfair Display' },
];

const ColorPicker = ({ title, colors, selectedColor, onColorChange }: { title: string, colors: { id: string, value: string, name: string }[], selectedColor: string, onColorChange: (color: string) => void }) => {
  return (
    <div>
      <h3 className="text-xl font-headline mb-4">{title}</h3>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-10 h-10 p-1 cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color.id}
              title={color.name}
              onClick={() => onColorChange(color.value)}
              className={cn(
                "w-8 h-8 rounded-full transition-transform transform hover:scale-110 border",
                selectedColor.toLowerCase() === color.value.toLowerCase() ? "ring-2 ring-primary ring-offset-2" : ""
              )}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const TemplateCard = ({
  template,
  isSelected,
  onClick,
  resumeData,
  color,
  bgColor,
  textColor,
  font,
  language
}: {
  template: typeof templates[0],
  isSelected: boolean,
  onClick: () => void,
  resumeData: any,
  color: string,
  bgColor: string,
  textColor: string,
  font: Font,
  language: Language
}) => {
  const TemplateComponent = template.component;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // The resume's base width is 840px (A4 paper width at a certain DPI)
        const newScale = containerWidth / 840;
        setScale(newScale);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const fontClass = `font-${font.toLowerCase().replace(' ', '-')}`;

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all overflow-hidden",
        isSelected ? "ring-2 ring-primary" : "hover:shadow-md"
      )}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base font-body">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={containerRef} className="aspect-[210/297] w-full overflow-hidden bg-background relative">
          <div
            className={cn("absolute origin-top-left", fontClass)}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              fontFamily: font,
            }}
          >
            <div className="w-[840px] h-[1188px]">
              <TemplateComponent
                data={resumeData}
                color={color}
                bgColor={bgColor}
                textColor={textColor}
                font={font}
                language={language}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StylePanel() {
  const { resumeData, selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor, selectedFont, setSelectedFont, selectedBgColor, setSelectedBgColor, selectedTextColor, setSelectedTextColor, selectedLanguage, setSelectedLanguage } = useResume();

  return (
    <div className="space-y-8">
      <ColorPicker
        title="Text Color"
        colors={textColors}
        selectedColor={selectedTextColor}
        onColorChange={setSelectedTextColor}
      />
      <ColorPicker
        title="Background Color"
        colors={bgColors}
        selectedColor={selectedBgColor}
        onColorChange={setSelectedBgColor}
      />
      <ColorPicker
        title="Accent Color"
        colors={accentColors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
      <div>
        <h3 className="text-xl font-headline mb-4">Font</h3>
        <div className="space-y-2">
          <Label htmlFor="font-select">Select a font family</Label>
          <Select value={selectedFont} onValueChange={(value) => setSelectedFont(value as Font)}>
            <SelectTrigger id="font-select">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map(font => (
                <SelectItem key={font.id} value={font.id} style={{ fontFamily: font.id }}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-headline mb-4">Section Language</h3>
        <div className="space-y-2">
          <Label htmlFor="language-select">Select section title language</Label>
          <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
            <SelectTrigger id="language-select">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="id">🇮🇩 Bahasa Indonesia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-headline mb-4">Template</h3>
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
              resumeData={resumeData}
              color={selectedColor}
              bgColor={selectedBgColor}
              textColor={selectedTextColor}
              font={selectedFont}
              language={selectedLanguage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


