
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Wrench, Code, Briefcase, GraduationCap, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

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
      <div className="w-2/5 p-8 flex flex-col items-center text-center" style={leftColStyle}>
        {data.personal.photo && (
          <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden shadow-lg">
            <Image
              src={data.personal.photo}
              alt={data.personal.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-bold mb-2" style={{ ...nameStyle, ...fontStyle, fontSize: '2rem' }}>{data.personal.name}</h1>
        <p className="font-medium mb-8" style={{ ...fontStyle, fontSize: '1rem', ...lightTextStyle }}>{data.personal.role}</p>

        <div className="space-y-6 text-sm text-left">
          <div>
            <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{ ...nameStyle, ...fontStyle }}><Mail size={16} /> {t(language, 'contact')}</h3>
            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="pl-6 block hover:underline">{data.personal.phone}</a>
            <a href={getMailtoLink(data.personal.email)} className="pl-6 block hover:underline">{data.personal.email}</a>
            <p className="pl-6">{data.personal.location}</p>
            {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="pl-6 hover:underline block" style={nameStyle}>{data.personal.website}</a>}
          </div>
          {data.skills && (
            <div>
              <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{ ...nameStyle, ...fontStyle }}><Wrench size={16} /> {t(language, 'skills')}</h3>
              <ul className="pl-6 list-disc list-inside">
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-3/5 p-8 overflow-y-auto">
        {data.personal.description && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{ ...sectionTitleStyle, ...fontStyle }}><User /> {t(language, 'profile')}</h2>
            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
          </section>
        )}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{ ...sectionTitleStyle, ...fontStyle }}><Briefcase /> {t(language, 'experience')}</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{exp.role}</h3>
                  <p className="text-sm" style={lightTextStyle}>{exp.date}</p>
                </div>
                <h4 className="font-semibold mb-2" style={{ ...fontStyle, fontSize: '1.125rem', ...lightTextStyle, opacity: 0.9 }}>{exp.company}</h4>
                <div className="text-sm prose max-w-none" style={lightTextStyle}>
                  {exp.description.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{ ...sectionTitleStyle, ...fontStyle }}><Code /> {t(language, 'projects')}</h2>
            {data.projects.map(proj => (
              <div key={proj.id} className="mb-5">
                <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{proj.name}</h3>
                {proj.link && (
                  <div className="text-sm mt-1" style={lightTextStyle}>
                    Link: <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline break-all" style={nameStyle}>{proj.link}</a>
                  </div>
                )}
                <div className="text-sm whitespace-pre-line prose max-w-none my-1" style={lightTextStyle}>{proj.description}</div>
                <p className="text-sm font-semibold" style={lightTextStyle}>Technologies: {proj.technologies}</p>
              </div>
            ))}
          </section>
        )}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{ ...sectionTitleStyle, ...fontStyle }}><GraduationCap /> {t(language, 'education')}</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{ ...fontStyle, fontSize: '1.25rem', ...textStyle }}>{edu.institution}</h3>
                  <p className="text-sm" style={lightTextStyle}>{edu.date}</p>
                </div>
                <h4 className="font-semibold mb-1" style={{ ...fontStyle, fontSize: '1.125rem', ...lightTextStyle, opacity: 0.9 }}>{edu.degree}</h4>
                <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

