// src/components/template-preview.tsx
import type { ResumeData, Font, Language } from '@/lib/types';
import { ModernTemplatePreview } from '@/components/templates/modern-template';
import { ClassicTemplatePreview } from '@/components/templates/classic-template';
import { CreativeTemplatePreview } from '@/components/templates/creative-template';
import { SwissTemplatePreview } from '@/components/templates/swiss-template';
import { ElegantTemplatePreview } from '@/components/templates/elegant-template';
import { ProfessionalTemplatePreview } from '@/components/templates/professional-template';
import { TimelineTemplatePreview } from '@/components/templates/timeline-template';
import { SmartStartTemplatePreview } from '@/components/templates/smart-start-template';
import { VektoristikTemplatePreview } from '@/components/templates/vektoristik-template';
import { AwesomeTemplatePreview } from '@/components/templates/awesome-template';
import { CooperTemplatePreview } from '@/components/templates/cooper-template';
import { DiamondTemplatePreview } from '@/components/templates/diamond-template';
import { HexagonvyTemplatePreview } from '@/components/templates/hexagonvy-template';
import { StarlightTemplatePreview } from '@/components/templates/starlight-template';
import { ConstructTemplatePreview } from '@/components/templates/construct-template';
import { LedgerTemplatePreview } from '@/components/templates/ledger-template';
import { BloxTemplatePreview } from '@/components/templates/blox-template';
import { AtsFriendlyTemplatePreview } from '@/components/templates/ats-friendly-template';
import { GitFolioTemplatePreview } from '@/components/templates/git-folio-template';

interface TemplatePreviewComponentProps {
  data: ResumeData;
  template: string;
  color: string;
  bgColor: string;
  textColor: string;
  font: Font;
  language?: Language;
}

// Helper function to ensure IDs are present in the resume data
const ensureIds = (resumeData: ResumeData): ResumeData => {
  return {
    ...resumeData,
    experience: resumeData.experience?.map((exp, index) => ({
      ...exp,
      id: exp.id || `exp-${index}`
    })) || [],
    education: resumeData.education?.map((edu, index) => ({
      ...edu,
      id: edu.id || `edu-${index}`
    })) || [],
    projects: resumeData.projects?.map((proj, index) => ({
      ...proj,
      id: proj.id || `proj-${index}`
    })) || []
  };
};

export const TemplatePreviewComponent = ({
  data,
  template,
  color,
  bgColor,
  textColor,
  font,
  language = 'en'
}: TemplatePreviewComponentProps) => {
  const templateMap: Record<string, React.ComponentType<any> | undefined> = {
    'git-folio': GitFolioTemplatePreview,
    'ats-friendly': AtsFriendlyTemplatePreview,
    blox: BloxTemplatePreview,
    ledger: LedgerTemplatePreview,
    construct: ConstructTemplatePreview,
    starlight: StarlightTemplatePreview,
    hexagonvy: HexagonvyTemplatePreview,
    diamond: DiamondTemplatePreview,
    cooper: CooperTemplatePreview,
    awesome: AwesomeTemplatePreview,
    vektoristik: VektoristikTemplatePreview,
    'smart-start': SmartStartTemplatePreview,
    timeline: TimelineTemplatePreview,
    professional: ProfessionalTemplatePreview,
    modern: ModernTemplatePreview,
    classic: ClassicTemplatePreview,
    creative: CreativeTemplatePreview,
    swiss: SwissTemplatePreview,
    elegant: ElegantTemplatePreview,
  };

  // Get the component, defaulting to ModernTemplatePreview if not found
  const TemplatePreview = templateMap[template] || ModernTemplatePreview;

  // Make sure all items have IDs
  const dataWithIds = ensureIds(data);

  return (
    <div className="p-0 m-0 w-full h-full" style={{
      width: '840px',
      height: '1188px',
      maxWidth: '840px',
      maxHeight: '1188px',
      overflow: 'hidden'
    }}>
      <TemplatePreview
        data={dataWithIds}
        color={color}
        bgColor={bgColor}
        textColor={textColor}
        font={font}
        language={language}
      />
    </div>
  );
};
