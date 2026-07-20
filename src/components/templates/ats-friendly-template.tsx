
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-4">
    <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 pb-0.5 mb-2">{title}</h2>
    {children}
  </section>
);

export const AtsFriendlyTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const fontStyle = { fontFamily: font };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };
  const sectionTitleStyle = { borderColor: textColor, color: textColor };
  const linkStyle = { color: color };

  return (
    <div className="p-8 h-full overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="text-2xl font-bold">{data.personal.name}</h1>
        <p className="text-sm mt-0.5">{data.personal.role}</p>
        <div className="flex justify-center items-center gap-x-3 text-xs mt-1.5" style={lightTextStyle}>
          <span>{data.personal.location}</span>
          <span>&bull;</span>
          <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline">{data.personal.phone}</a>
          <span>&bull;</span>
          <a href={getMailtoLink(data.personal.email)} className="hover:underline">{data.personal.email}</a>
          {data.personal.website && (
            <>
              <span>&bull;</span>
              <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noopener noreferrer" className="hover:underline" style={linkStyle}>{data.personal.website}</a>
            </>
          )}
        </div>
      </header>

      {/* Profile / Summary */}
      {data.personal.description && (
        <Section title={t(language, 'summary')}>
          <p className="text-xs whitespace-pre-line mt-1 text-justify" style={lightTextStyle}>{data.personal.description}</p>
        </Section>
      )}

      {/* Skills */}
      {data.skills && (
        <Section title={t(language, 'skills')}>
          <p className="text-xs whitespace-pre-line mt-1" style={lightTextStyle}>{data.skills}</p>
        </Section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Section title={t(language, 'experience')}>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{exp.company}</h3>
                <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
              </div>
              <p className="text-xs font-semibold italic">{exp.role}</p>
              <div className="text-xs text-justify mt-0.5 space-y-1" style={lightTextStyle}>
                {exp.description.split('\n')
                  .map(line => line.trim())
                  .filter(line => line.length > 0)
                  .map((line, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="flex-shrink-0 select-none">•</span>
                      <span className="flex-1">{line.replace(/^[-*•]\s*/, '')}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <Section title={t(language, 'projects')}>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{proj.name}</h3>
                {proj.link && (
                  <div className="text-xs" style={lightTextStyle}>
                    <a href={getWebsiteLink(proj.link)} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={linkStyle}>Link</a>
                  </div>
                )}
              </div>
              <p className="font-semibold italic text-xs" style={lightTextStyle}>Technologies: {proj.technologies}</p>
              {proj.description && <div className="text-xs text-justify mt-0.5" style={lightTextStyle}>{proj.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Section title={t(language, 'education')}>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{edu.institution}</h3>
                <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
              </div>
              <p className="text-xs italic" style={lightTextStyle}>{edu.degree}</p>
              {edu.description && <p className="text-xs mt-0.5 text-justify" style={lightTextStyle}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

    </div>
  );
};
