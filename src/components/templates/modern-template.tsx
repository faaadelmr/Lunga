
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

// Web Preview Component
export const ModernTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const sectionTitleStyle = {
    borderColor: color,
    color: color,
  };

  const skillStyle = {
    backgroundColor: `${color}20`, // 20% opacity
    color: color,
    borderColor: `${color}80`
  }

  const fontStyle = { fontFamily: font };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="p-6 h-full overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      {/* Header */}
      <header className="text-center mb-4 border-b-2 pb-3 flex items-center justify-between" style={{ borderColor: color }}>
        {data.personal.photo && (
          <div className="w-20 h-20 relative rounded-full overflow-hidden shadow-md flex-shrink-0">
            <Image
              src={data.personal.photo}
              alt={data.personal.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className={data.personal.photo ? "text-right flex-grow" : "text-center w-full"}>
          <h1 className="font-bold leading-none" style={{ ...fontStyle, color, fontSize: '2.25rem' }}>{data.personal.name}</h1>
          <p className="font-medium mt-1 text-sm" style={{ ...fontStyle, ...lightTextStyle }}>{data.personal.role}</p>
          <div className={cn("flex items-center gap-x-2 text-xs mt-2.5 whitespace-nowrap", data.personal.photo ? "justify-end" : "justify-center")} style={lightTextStyle}>
            <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-1 hover:underline"><Mail size={12} /> {data.personal.email}</a>
            <span className="opacity-50">&bull;</span>
            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><Phone size={12} /> {data.personal.phone}</a>
            <span className="opacity-50">&bull;</span>
            <div className="flex items-center gap-1"><MapPin size={12} /> {data.personal.location}</div>
            {data.personal.website && (
              <>
                <span className="opacity-50">&bull;</span>
                <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color }}><Globe size={12} />{data.personal.website}</a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Profile */}
      {data.personal.description && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-1.5" style={{ ...sectionTitleStyle, ...fontStyle }}><User size={16} />{t(language, 'profile')}</h2>
          <p className="text-xs whitespace-pre-line leading-relaxed" style={lightTextStyle}>{data.personal.description}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-1.5" style={{ ...sectionTitleStyle, ...fontStyle }}><Briefcase size={16} />{t(language, 'experience')}</h2>
          <div className="space-y-3">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs" style={{ ...fontStyle, ...textStyle }}>{exp.role}</h3>
                  <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                </div>
                <h4 className="font-semibold text-xs mb-0.5" style={{ ...fontStyle, color }}>{exp.company}</h4>
                <div className="text-xs leading-relaxed" style={lightTextStyle}>
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
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-1.5" style={{ ...sectionTitleStyle, ...fontStyle }}><GraduationCap size={16} />{t(language, 'education')}</h2>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs" style={{ ...fontStyle, ...textStyle }}>{edu.institution}</h3>
                  <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                </div>
                <h4 className="font-semibold text-xs mb-0.5" style={{ ...fontStyle, color }}>{edu.degree}</h4>
                {edu.description && <p className="text-xs leading-relaxed" style={lightTextStyle}>{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Projects */}
      {(data.skills || (data.projects && data.projects.length > 0)) && (
        <div className="grid grid-cols-2 gap-6">
          {data.skills && (
            <section>
              <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Wrench size={16} />{t(language, 'skills')}</h2>
              <div className="flex flex-wrap gap-1.5">
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <span key={skill} className="text-xs font-medium py-0.5 px-2 rounded-full border" style={skillStyle}>{skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Code size={16} />{t(language, 'projects')}</h2>
              <div className="space-y-3">
                {data.projects.map(proj => (
                  <div key={proj.id} className={themeStandards.typography.body}>
                    <a href={getWebsiteLink(proj.link || '')} target="_blank" rel="noreferrer" className="font-bold hover:underline inline-block" style={{ color }}>{proj.name}</a>
                    {proj.description && <p className="text-xs leading-relaxed mt-0.5" style={lightTextStyle}>{proj.description}</p>}
                    <p className="text-xs font-semibold mt-0.5" style={skillStyle}>Tech: {proj.technologies}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

