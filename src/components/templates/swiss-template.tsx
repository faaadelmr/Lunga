
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, User, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

export const SwissTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const accentColor = { color: color };
  const fontStyle = { fontFamily: font };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };
  const lighterTextStyle = { color: textColor, opacity: 0.6 };

  return (
    <div className="p-10 h-full overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      <div className="grid grid-cols-12 gap-x-12">
        {/* Header */}
        <header className="col-span-12 border-b-4 pb-6 mb-8 flex items-center justify-between" style={{ borderColor: textColor }}>
          <div>
            <h1 className="font-bold tracking-tighter uppercase" style={{ ...fontStyle, ...accentColor, fontSize: '2.5rem' }}>{data.personal.name}</h1>
            <p className="font-light mt-1" style={{ ...fontStyle, fontSize: '1.5rem', ...lightTextStyle }}>{data.personal.role}</p>
          </div>
          {data.personal.photo && (
            <div className="w-24 h-24 relative rounded-full overflow-hidden shadow-md flex-shrink-0 border-2" style={{ borderColor: color }}>
              <Image
                src={data.personal.photo}
                alt={data.personal.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Left Column */}
        <aside className="col-span-4 pr-8 border-r" style={{ borderColor: `${textColor}20` }}>
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ ...accentColor, ...fontStyle }}>{t(language, 'contact')}</h2>
            <div className="space-y-2 text-sm" style={lightTextStyle}>
              <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-3 hover:underline">
                <Mail size={14} style={lighterTextStyle} />
                <span>{data.personal.email}</span>
              </a>
              <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                <Phone size={14} style={lighterTextStyle} />
                <span>{data.personal.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={14} style={lighterTextStyle} />
                <span>{data.personal.location}</span>
              </div>
              {data.personal.website && (
                <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                  <Globe size={14} style={lighterTextStyle} />
                  <span style={accentColor}>{data.personal.website}</span>
                </a>
              )}
            </div>
          </section>

          {data.skills && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ ...accentColor, ...fontStyle }}>{t(language, 'skills')}</h2>
              <ul className="space-y-1.5 text-sm" style={lightTextStyle}>
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Column */}
        <main className="col-span-8">
          {data.personal.description && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ ...accentColor, ...fontStyle }}>{t(language, 'profile')}</h2>
              <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ ...accentColor, ...fontStyle }}>{t(language, 'experience')}</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{exp.role}</h3>
                    <p className="text-xs font-mono" style={lighterTextStyle}>{exp.date}</p>
                  </div>
                  <h4 className="font-semibold text-lg mb-2" style={{ ...fontStyle, fontSize: '1.125rem', ...lightTextStyle }}>{exp.company}</h4>
                  <div className="text-sm prose max-w-none prose-sm" style={lightTextStyle}>
                    {exp.description.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ ...accentColor, ...fontStyle }}>{t(language, 'education')}</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{edu.institution}</h3>
                    <p className="text-xs font-mono" style={lighterTextStyle}>{edu.date}</p>
                  </div>
                  <h4 className="font-semibold text-lg mb-2" style={{ ...fontStyle, fontSize: '1.125rem', ...lightTextStyle }}>{edu.degree}</h4>
                  <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ ...accentColor, ...fontStyle }}>{t(language, 'projects')}</h2>
              {data.projects.map(proj => (
                <div key={proj.id} className="mb-6">
                  <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{proj.name}</h3>
                  {proj.link && (
                    <div className="text-sm mt-1" style={lightTextStyle}>
                      Link: <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline break-all" style={accentColor}>{proj.link}</a>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line my-1" style={lightTextStyle}>{proj.description}</p>
                  <p className="text-sm font-semibold" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
