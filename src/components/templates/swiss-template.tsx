
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, User, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

export const SwissTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const accentColor = { color: color };
  const fontStyle = { fontFamily: font };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };
  const lighterTextStyle = { color: textColor, opacity: 0.6 };

  return (
    <div className="p-8 h-full overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      <div className="grid grid-cols-12 gap-x-8">
        {/* Header */}
        <header className="col-span-12 border-b-2 pb-4 mb-6 flex items-center justify-between" style={{ borderColor: textColor }}>
          <div>
            <h1 className="font-extrabold tracking-tighter uppercase leading-none" style={{ ...fontStyle, ...accentColor, fontSize: '2.25rem' }}>{data.personal.name}</h1>
            <p className="font-medium mt-1.5" style={{ ...fontStyle, fontSize: '1.25rem', ...lightTextStyle }}>{data.personal.role}</p>
          </div>
          {data.personal.photo && (
            <div className="w-20 h-20 relative rounded-full overflow-hidden shadow-sm flex-shrink-0 border-2" style={{ borderColor: color }}>
              <Image
                src={data.personal.photo}
                alt={data.personal.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </header>

        {/* Left Column */}
        <aside className="col-span-4 pr-6 border-r" style={{ borderColor: `${textColor}20` }}>
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ ...accentColor, ...fontStyle }}>{t(language, 'contact')}</h2>
            <div className="space-y-2 text-xs" style={lightTextStyle}>
              <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2 hover:underline">
                <Mail size={12} style={lighterTextStyle} />
                <span className="truncate">{data.personal.email}</span>
              </a>
              <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <Phone size={12} style={lighterTextStyle} />
                <span>{data.personal.phone}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={12} style={lighterTextStyle} />
                <span>{data.personal.location}</span>
              </div>
              {data.personal.website && (
                <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                  <Globe size={12} style={lighterTextStyle} />
                  <span className="truncate" style={accentColor}>{data.personal.website}</span>
                </a>
              )}
            </div>
          </section>

          {data.skills && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ ...accentColor, ...fontStyle }}>{t(language, 'skills')}</h2>
              <ul className="space-y-1 text-xs" style={lightTextStyle}>
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Column */}
        <main className="col-span-8">
          {data.personal.description && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ ...accentColor, ...fontStyle }}>{t(language, 'profile')}</h2>
              <p className="text-xs leading-relaxed" style={lightTextStyle}>{data.personal.description}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ ...accentColor, ...fontStyle }}>{t(language, 'experience')}</h2>
              <div className="space-y-4">
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm" style={{ ...fontStyle, ...textStyle }}>{exp.role}</h3>
                      <p className="text-xs font-mono" style={lighterTextStyle}>{exp.date}</p>
                    </div>
                    <h4 className="font-semibold text-xs" style={{ ...fontStyle, color }}>{exp.company}</h4>
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

          {data.education && data.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ ...accentColor, ...fontStyle }}>{t(language, 'education')}</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm" style={{ ...fontStyle, ...textStyle }}>{edu.degree}</h3>
                      <p className="text-xs font-mono" style={lighterTextStyle}>{edu.date}</p>
                    </div>
                    <h4 className="font-semibold text-xs" style={{ ...fontStyle, ...lightTextStyle }}>{edu.institution}</h4>
                    {edu.description && <p className="text-xs leading-relaxed" style={lightTextStyle}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ ...accentColor, ...fontStyle }}>{t(language, 'projects')}</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm" style={{ ...fontStyle, ...textStyle }}>{proj.name}</h3>
                      {proj.link && (
                        <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={accentColor}>Link</a>
                      )}
                    </div>
                    {proj.description && <p className="text-xs leading-relaxed" style={lightTextStyle}>{proj.description}</p>}
                    <p className="text-xs font-semibold" style={lightTextStyle}>Tech: {proj.technologies}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
