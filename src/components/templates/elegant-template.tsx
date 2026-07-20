
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Star, Code, Briefcase, GraduationCap, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

export const ElegantTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const accentColorStyle = { color: color };
  const fontStyle = { fontFamily: font };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="h-full p-8 flex flex-col" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      <header className="text-center mb-4 flex flex-col items-center">
        {data.personal.photo && (
          <div className="w-24 h-24 relative mb-3 rounded-full overflow-hidden shadow-lg border-2" style={{ borderColor: color }}>
            <Image
              src={data.personal.photo}
              alt={data.personal.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-extrabold tracking-widest uppercase leading-none" style={{ ...fontStyle, color, fontSize: '2.25rem' }}>{data.personal.name}</h1>
        <p className="font-medium mt-1.5 tracking-wider text-sm" style={{ ...fontStyle, ...lightTextStyle }}>{data.personal.role}</p>
      </header>

      <div className="border-t-2 border-b-2 my-2" style={{ borderColor: color }}>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs py-2" style={lightTextStyle}>
          <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-1.5 hover:underline"><Mail size={12} /> {data.personal.email}</a>
          <span className="opacity-40">&bull;</span>
          <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Phone size={12} /> {data.personal.phone}</a>
          <span className="opacity-40">&bull;</span>
          <div className="flex items-center gap-1.5"><MapPin size={12} /> {data.personal.location}</div>
          {data.personal.website && (
            <>
              <span className="opacity-40">&bull;</span>
              <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5" style={accentColorStyle}><Globe size={12} />{data.personal.website}</a>
            </>
          )}
        </div>
      </div>

      <main className="grid grid-cols-12 gap-8 mt-6">
        <div className="col-span-8 pr-6">
          {data.personal.description && (
            <section className="mb-6">
              <h2 className="text-base font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1" style={{ ...accentColorStyle, ...fontStyle }}>
                <User size={16} />
                {t(language, 'profile')}
              </h2>
              <p className="text-xs leading-relaxed" style={lightTextStyle}>{data.personal.description}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-base font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1" style={{ ...accentColorStyle, ...fontStyle }}>
                <Briefcase size={16} />
                {t(language, 'experience')}
              </h2>
              <div className="space-y-4">
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm" style={{ ...fontStyle, color: textColor }}>{exp.role}</h3>
                      <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                    </div>
                    <h4 className="font-semibold text-xs" style={{ ...fontStyle, ...lightTextStyle, opacity: 0.9 }}>{exp.company}</h4>
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
              <h2 className="text-base font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1" style={{ ...accentColorStyle, ...fontStyle }}>
                <GraduationCap size={16} />
                {t(language, 'education')}
              </h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm" style={{ ...fontStyle, color: textColor }}>{edu.institution}</h3>
                      <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                    </div>
                    <h4 className="font-semibold text-xs" style={{ ...fontStyle, ...lightTextStyle, opacity: 0.9 }}>{edu.degree}</h4>
                    {edu.description && <p className="text-xs leading-relaxed" style={lightTextStyle}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 pl-6 border-l" style={{ borderColor: `${textColor}20` }}>
          {data.skills && (
            <section className="mb-6">
              <h2 className="text-base font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1" style={{ ...accentColorStyle, ...fontStyle }}>
                <Star size={16} />
                {t(language, 'skills')}
              </h2>
              <ul className="space-y-1">
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill} className={themeStandards.typography.body} style={lightTextStyle}>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-base font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1" style={{ ...accentColorStyle, ...fontStyle }}>
                <Code size={16} />
                {t(language, 'projects')}
              </h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="space-y-1">
                    {proj.link ? (
                      <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="font-bold text-xs hover:underline" style={accentColorStyle}>{proj.name}</a>
                    ) : (
                      <span className="font-bold text-xs" style={accentColorStyle}>{proj.name}</span>
                    )}
                    {proj.description && <p className="text-xs leading-relaxed" style={lightTextStyle}>{proj.description}</p>}
                    <p className="text-xs font-semibold opacity-90" style={lightTextStyle}>Tech: {proj.technologies}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
