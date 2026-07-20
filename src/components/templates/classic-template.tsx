
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Wrench, Code, Briefcase, GraduationCap, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

// Web Preview Component
export const ClassicTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const leftColStyle = { backgroundColor: `${color}1A` }; // 10% opacity
  const nameStyle = { color: color };
  const sectionTitleStyle = { borderBottomColor: color, color: color };
  const fontStyle = { fontFamily: font };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="flex h-full" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      {/* Left Column */}
      <div className="w-2/5 p-5 flex flex-col items-center text-center" style={leftColStyle}>
        {data.personal.photo && (
          <div className="w-20 h-20 relative mb-3 rounded-full overflow-hidden shadow-lg">
            <Image
              src={data.personal.photo}
              alt={data.personal.name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-bold mb-1" style={{ ...nameStyle, ...fontStyle, fontSize: '1.25rem' }}>{data.personal.name}</h1>
        <p className="font-medium mb-4 text-xs" style={{ ...fontStyle, ...lightTextStyle }}>{data.personal.role}</p>

        <div className="space-y-4 text-xs text-left w-full">
          <div>
            <h3 className="font-bold text-xs mb-1.5 flex items-center gap-1.5" style={{ ...nameStyle, ...fontStyle }}><Mail size={12} /> {t(language, 'contact')}</h3>
            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="pl-5 block hover:underline">{data.personal.phone}</a>
            <a href={getMailtoLink(data.personal.email)} className="pl-5 block hover:underline">{data.personal.email}</a>
            <p className="pl-5">{data.personal.location}</p>
            {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="pl-5 hover:underline block truncate" style={nameStyle}>{data.personal.website}</a>}
          </div>
          {data.skills && (
            <div>
              <h3 className="font-bold text-xs mb-1.5 flex items-center gap-1.5" style={{ ...nameStyle, ...fontStyle }}><Wrench size={12} /> {t(language, 'skills')}</h3>
              <ul className="pl-5 list-disc list-inside">
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-3/5 p-5 overflow-y-auto">
        {data.personal.description && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase border-b-2 pb-1 mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><User size={14} /> {t(language, 'profile')}</h2>
            <p className="text-xs whitespace-pre-line leading-relaxed" style={lightTextStyle}>{data.personal.description}</p>
          </section>
        )}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase border-b-2 pb-1 mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Briefcase size={14} /> {t(language, 'experience')}</h2>
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
        {data.projects && data.projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase border-b-2 pb-1 mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Code size={14} /> {t(language, 'projects')}</h2>
            <div className="space-y-3">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-xs" style={{ ...fontStyle, ...textStyle }}>{proj.name}</h3>
                    {proj.link && (
                      <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={nameStyle}>Link</a>
                    )}
                  </div>
                  {proj.description && <div className="text-xs leading-relaxed mt-0.5" style={lightTextStyle}>{proj.description}</div>}
                  <p className="text-xs font-semibold mt-0.5" style={lightTextStyle}>Tech: {proj.technologies}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase border-b-2 pb-1 mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><GraduationCap size={14} /> {t(language, 'education')}</h2>
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
      </div>
    </div>
  );
};

