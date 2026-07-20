
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Star, Code, Briefcase, GraduationCap, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

export const ElegantTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const accentColorStyle = { color: color };
  const fontStyle = { fontFamily: font };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="h-full p-10 flex flex-col" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      <header className="text-center mb-8 flex flex-col items-center">
        {data.personal.photo && (
          <div className="w-28 h-28 relative mb-4 rounded-full overflow-hidden shadow-lg border-4" style={{ borderColor: color }}>
            <Image
              src={data.personal.photo}
              alt={data.personal.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-bold tracking-widest uppercase" style={{ ...fontStyle, color, fontSize: '2.5rem' }}>{data.personal.name}</h1>
        <p className="font-light mt-2 tracking-wider" style={{ ...fontStyle, fontSize: '1.25rem', ...lightTextStyle }}>{data.personal.role}</p>
      </header>

      <div className="border-t-2 border-b-2 my-4" style={{ borderColor: color }}>
        <div className="flex justify-center items-center gap-x-6 text-xs py-3" style={lightTextStyle}>
          <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2 hover:underline"><Mail size={14} /> {data.personal.email}</a>
          <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Phone size={14} /> {data.personal.phone}</a>
          <div className="flex items-center gap-2"><MapPin size={14} /> {data.personal.location}</div>
          {data.personal.website && (
            <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2" style={accentColorStyle}><Globe size={14} />{data.personal.website}</a>
          )}
        </div>
      </div>

      <main className="grid grid-cols-12 gap-10 flex-grow mt-8">
        <div className="col-span-8 pr-8">
          {data.personal.description && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-5 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
                <User />
                {t(language, 'profile')}
              </h2>
              <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-5 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
                <Briefcase />
                {t(language, 'experience')}
              </h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.125rem', color: textColor }}>{exp.role}</h3>
                    <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ ...fontStyle, fontSize: '1rem', ...lightTextStyle, opacity: 0.9 }}>{exp.company}</h4>
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
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-5 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
                <GraduationCap />
                {t(language, 'education')}
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.125rem', color: textColor }}>{edu.institution}</h3>
                    <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ ...fontStyle, fontSize: '1rem', ...lightTextStyle, opacity: 0.9 }}>{edu.degree}</h4>
                  <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-4 pl-8 border-l" style={{ borderColor: `${textColor}20` }}>
          {data.skills && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-4 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
                <Star />
                {t(language, 'skills')}
              </h2>
              <ul className="space-y-2">
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill} className="text-sm" style={lightTextStyle}>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-4 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
                <Code />
                {t(language, 'projects')}
              </h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="text-sm">
                    <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold hover:underline" style={accentColorStyle}>{proj.name}</a>
                    <p className="text-xs mt-1" style={lightTextStyle}>{proj.description}</p>
                    <p className="text-xs mt-1 font-semibold" style={lightTextStyle}>Technologies: {proj.technologies}</p>
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
