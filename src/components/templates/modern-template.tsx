
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

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
    <div className="p-8 h-full overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      {/* Header */}
      <header className="text-center mb-10 border-b-2 pb-6 flex items-center justify-between" style={{ borderColor: color }}>
        {data.personal.photo && (
          <div className="w-28 h-28 relative rounded-full overflow-hidden shadow-md flex-shrink-0">
            <Image
              src={data.personal.photo}
              alt={data.personal.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className={data.personal.photo ? "text-right flex-grow" : "text-center w-full"}>
          <h1 className="font-bold" style={{ ...fontStyle, color, fontSize: '3rem' }}>{data.personal.name}</h1>
          <p className="font-light mt-2" style={{ ...fontStyle, fontSize: '1.25rem', ...lightTextStyle }}>{data.personal.role}</p>
          <div className={cn("flex items-center gap-x-2 text-xs mt-4 whitespace-nowrap", data.personal.photo ? "justify-end" : "justify-center")} style={lightTextStyle}>
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
        <section className="mb-8">
          <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{ ...sectionTitleStyle, ...fontStyle }}><User />{t(language, 'profile')}</h2>
          <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{ ...sectionTitleStyle, ...fontStyle }}><Briefcase />{t(language, 'experience')}</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{exp.role}</h3>
                <p className="text-sm font-mono" style={lightTextStyle}>{exp.date}</p>
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ ...fontStyle, color, fontSize: '1.125rem' }}>{exp.company}</h4>
              <div className="text-sm prose max-w-none prose-sm" style={lightTextStyle}>
                {exp.description.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{ ...sectionTitleStyle, ...fontStyle }}><GraduationCap />{t(language, 'education')}</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{edu.institution}</h3>
                <p className="text-sm font-mono" style={lightTextStyle}>{edu.date}</p>
              </div>
              <h4 className="text-lg font-semibold mb-1" style={{ ...fontStyle, color, fontSize: '1.125rem' }}>{edu.degree}</h4>
              <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills & Projects */}
      {(data.skills || (data.projects && data.projects.length > 0)) && (
        <div className="grid grid-cols-2 gap-8">
          {data.skills && (
            <section>
              <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{ ...sectionTitleStyle, ...fontStyle }}><Wrench />{t(language, 'skills')}</h2>
              <div className="flex flex-wrap gap-2">
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <span key={skill} className="text-sm font-medium py-1 px-3 rounded-full border" style={skillStyle}>{skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{ ...sectionTitleStyle, ...fontStyle }}><Code />{t(language, 'projects')}</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="text-sm">
                    <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold hover:underline inline-block" style={{ color }}>{proj.name}</a>
                    {proj.link && (
                      <div className="text-xs mt-1" style={lightTextStyle}>
                        Link: <a href={proj.link} target="_blank" rel="noreferrer" className="underline break-all" style={{ color }}>{proj.link}</a>
                      </div>
                    )}
                    <p className="text-xs mt-1" style={lightTextStyle}>{proj.description}</p>
                    <p className="text-xs mt-1 font-semibold" style={skillStyle}>{proj.technologies}</p>
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

