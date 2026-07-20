
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, User, Home, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

export const TimelineTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const fontStyle = { fontFamily: font };

  // Use the selected color for the header background
  const headerBgStyle = { backgroundColor: color };
  // Text on the dark header should be light
  const headerTextStyle = { color: bgColor };
  // Main body background
  const bodyBgStyle = { backgroundColor: bgColor };
  // Sidebar background (slightly darker than body)
  const sidebarBgStyle = { backgroundColor: `${color}1A` }; // 10% opacity of accent color
  // Main text color for the body
  const bodyTextStyle = { color: textColor };
  const accentColorStyle = { color };

  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ ...fontStyle, ...bodyBgStyle }}>
      {/* Header Section */}
      <header className="flex text-white p-8" style={headerBgStyle}>
        <div className="w-1/3 flex flex-col justify-center pr-6">
          <h1 className="font-bold uppercase tracking-wider" style={{ ...headerTextStyle, fontSize: '2.5rem', lineHeight: '1.1' }}>{data.personal.name}</h1>
          <div className="w-1/4 h-1 my-3" style={{ backgroundColor: bgColor }}></div>
          <p className="font-light tracking-widest" style={{ ...headerTextStyle, fontSize: '1.25rem' }}>{data.personal.role}</p>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          {data.personal.photo && (
            <div className="w-36 h-36 relative rounded-full overflow-hidden border-4" style={{ borderColor: bgColor }}>
              <Image
                src={data.personal.photo}
                alt={data.personal.name}
                width={144}
                height={144}
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="w-1/3 flex flex-col justify-center pl-6">
          {data.personal.description && <>
            <h2 className="font-bold text-2xl mb-2" style={headerTextStyle}>HELLO!</h2>
            <p className="text-xs whitespace-pre-line" style={{ ...headerTextStyle, opacity: 0.8 }}>{data.personal.description}</p>
          </>}
        </div>
      </header>

      {/* Body Section */}
      <main className="flex flex-grow">
        {/* Left Sidebar */}
        <aside className="w-1/3 p-8" style={sidebarBgStyle}>
          <section className="mb-8">
            <h3 className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{ ...accentColorStyle, borderColor: color }}>{t(language, 'contact')}</h3>
            <div className="space-y-3 text-sm" style={bodyTextStyle}>
              <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                <Phone size={14} style={accentColorStyle} /> <span>{data.personal.phone}</span>
              </a>
              <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-3 hover:underline">
                <Mail size={14} style={accentColorStyle} /> <span>{data.personal.email}</span>
              </a>
              <div className="flex items-center gap-3">
                <Home size={14} style={accentColorStyle} /> <span>{data.personal.location}</span>
              </div>
            </div>
          </section>
          {data.skills && (
            <section className="mb-8">
              <h3 className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{ ...accentColorStyle, borderColor: color }}>{t(language, 'skills')}</h3>
              <ul className="space-y-2 text-sm list-disc list-inside" style={bodyTextStyle}>
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h3 className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{ ...accentColorStyle, borderColor: color }}>{t(language, 'projects')}</h3>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="text-sm">
                    <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold hover:underline" style={accentColorStyle}>{proj.name}</a>
                    <p className="text-xs mt-1" style={{ opacity: 0.8 }}>{proj.description}</p>
                    <p className="text-xs mt-1 font-semibold" style={{ opacity: 0.8 }}>Technologies: {proj.technologies}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Main Content */}
        <div className="w-2/3 p-8" style={bodyTextStyle}>
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{ ...accentColorStyle, borderColor: color }}>{t(language, 'education')}</h3>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-semibold">{edu.date}</p>
                    <h4 className="font-bold text-lg" style={bodyTextStyle}>{edu.degree}</h4>
                    <p className="text-sm" style={{ opacity: 0.8 }}>{edu.institution}</p>
                    <p className="text-sm whitespace-pre-line" style={{ opacity: 0.8 }}>{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{ ...accentColorStyle, borderColor: color }}>{t(language, 'workHistory')}</h3>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-lg" style={bodyTextStyle}>{exp.role}</h4>
                      <p className="text-sm font-semibold">{exp.date}</p>
                    </div>
                    <p className="text-sm mb-2" style={{ opacity: 0.8 }}>{exp.company}</p>
                    <div className="text-sm prose max-w-none prose-sm" style={{ opacity: 0.8 }}>
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
        </div>
      </main>
    </div>
  );
};
