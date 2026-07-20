
"use client";

import { useEffect, useRef, useState } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileText } from "lucide-react";
import { ModernTemplatePreview } from "./templates/modern-template";
import { ClassicTemplatePreview } from "./templates/classic-template";
import { CreativeTemplatePreview } from "./templates/creative-template";
import { SwissTemplatePreview } from "./templates/swiss-template";
import { ElegantTemplatePreview } from "./templates/elegant-template";
import { ProfessionalTemplatePreview } from "./templates/professional-template";
import { TimelineTemplatePreview } from "./templates/timeline-template";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { GoogleFontLoader } from "./google-font-loader";
import { SmartStartTemplatePreview } from "./templates/smart-start-template";
import { VektoristikTemplatePreview } from "./templates/vektoristik-template";
import { AwesomeTemplatePreview } from "./templates/awesome-template";
import { CooperTemplatePreview } from "./templates/cooper-template";
import { QueteTemplatePreview } from "./templates/quete-template";
import { DiamondTemplatePreview } from "./templates/diamond-template";
import { HexagonvyTemplatePreview } from "./templates/hexagonvy-template";
import { StarlightTemplatePreview } from "./templates/starlight-template";
import { ConstructTemplatePreview } from "./templates/construct-template";
import { LedgerTemplatePreview } from "./templates/ledger-template";
import { BloxTemplatePreview } from "./templates/blox-template";
import { AtsFriendlyTemplatePreview } from "./templates/ats-friendly-template";
import { GitFolioTemplatePreview } from "./templates/git-folio-template";
import { GlassmorphismTemplatePreview } from "./templates/glassmorphism-template";
import { DeveloperCliTemplatePreview } from "./templates/developer-cli-template";
import { NeoBrutalistTemplatePreview } from "./templates/neo-brutalist-template";
import type { Font } from "@/lib/types";


const templateMap = {
  'git-folio': {
    preview: GitFolioTemplatePreview,
  },
  'ats-friendly': {
    preview: AtsFriendlyTemplatePreview,
  },
  blox: {
    preview: BloxTemplatePreview,
  },
  ledger: {
    preview: LedgerTemplatePreview,
  },
  construct: {
    preview: ConstructTemplatePreview,
  },
  starlight: {
    preview: StarlightTemplatePreview,
  },
  hexagonvy: {
    preview: HexagonvyTemplatePreview,
  },
  diamond: {
    preview: DiamondTemplatePreview,
  },
  quete: {
    preview: QueteTemplatePreview,
  },
  cooper: {
    preview: CooperTemplatePreview,
  },
  awesome: {
    preview: AwesomeTemplatePreview,
  },
  vektoristik: {
    preview: VektoristikTemplatePreview,
  },
  'smart-start': {
    preview: SmartStartTemplatePreview,
  },
  timeline: {
    preview: TimelineTemplatePreview,
  },
  professional: {
    preview: ProfessionalTemplatePreview,
  },
  modern: {
    preview: ModernTemplatePreview,
  },
  classic: {
    preview: ClassicTemplatePreview,
  },
  creative: {
    preview: CreativeTemplatePreview,
  },
  swiss: {
    preview: SwissTemplatePreview,
  },
  elegant: {
    preview: ElegantTemplatePreview,
  },
  glassmorphism: {
    preview: GlassmorphismTemplatePreview,
  },
  'developer-cli': {
    preview: DeveloperCliTemplatePreview,
  },
  'neo-brutalist': {
    preview: NeoBrutalistTemplatePreview,
  },
};

export function ResumePreviewPanel() {
  const { resumeData, selectedTemplate, selectedColor, selectedFont, selectedBgColor, selectedTextColor, selectedLanguage } = useResume();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function updateScale() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const resumeWidth = 840; // A4 width in pixels
        if (containerWidth > 0 && resumeWidth > 0) {
          const newScale = containerWidth / resumeWidth;
          setScale(newScale);
        }
      }
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [isClient]);

  const TemplatePreview = templateMap[selectedTemplate].preview;

  const fileName = resumeData.personal.name ? `${resumeData.personal.name.replace(/\s+/g, '-')}-Resume.pdf` : 'resume.pdf';

  const handleDownload = async () => {
    setLoading(true);

    try {
      // Call the PDF generation API
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          template: selectedTemplate,
          color: selectedColor,
          bgColor: selectedBgColor,
          textColor: selectedTextColor,
          font: selectedFont,
          language: selectedLanguage,
          fileName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      alert('Error generating PDF: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const fontClass = `font-${selectedFont.toLowerCase().replace(' ', '-')}`;

  return (
    <div className="h-full min-h-0 bg-secondary flex flex-col items-center justify-start p-4 md:p-8 overflow-auto">
      <div className="w-full max-w-4xl flex justify-end mb-4 flex-shrink-0">
        {isClient ? (
          <Button onClick={handleDownload} disabled={loading} className="flex items-center gap-2 px-4 py-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {loading ? "Generating PDF..." : "Download PDF"}
          </Button>
        ) : (
          <Button disabled className="flex items-center gap-2 px-4 py-2">
            <FileText className="h-4 w-4" />
            Loading Preview...
          </Button>
        )}
      </div>
      <div
        ref={containerRef}
        className="w-full max-w-4xl mx-auto flex-grow flex items-center justify-center"
      >
        <div
          className="bg-white dark:bg-card-foreground/5 shadow-xl rounded-lg w-full aspect-[210/297] overflow-hidden border border-border/30 transition-all duration-300 hover:shadow-2xl"
          id="resume-container"
        >
          <div
            id="resume-preview"
            className={cn("w-full h-full overflow-hidden", fontClass)}
            style={{
              fontFamily: selectedFont,
            }}
          >
            {isClient ? (
              <div
                ref={resumeRef}
                className="w-[840px] h-[1188px] transform origin-top-left transition-transform duration-300"
                style={{ transform: `scale(${scale})` }}
              >
                <GoogleFontLoader font={selectedFont} />
                <TemplatePreview
                  data={resumeData}
                  color={selectedColor}
                  bgColor={selectedBgColor}
                  textColor={selectedTextColor}
                  font={selectedFont}
                  language={selectedLanguage}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <Skeleton className="w-full h-full max-w-md mx-auto rounded-lg" />
                  <p className="mt-4 text-sm text-muted-foreground">Loading your resume preview...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Information and tips panel */}
      <div className="w-full max-w-4xl mt-6 text-center">
        <div className="bg-muted/30 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-2">
            Your resume preview is shown above. Click "Download PDF" to save a print-ready version.
          </p>
          <p className="text-xs text-muted-foreground/80">
            For best results, use standard A4 paper when printing your resume.
          </p>
        </div>
      </div>
    </div>
  );
}
