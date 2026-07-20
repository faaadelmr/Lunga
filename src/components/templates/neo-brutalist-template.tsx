"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

export const NeoBrutalistTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const fontStyle = { fontFamily: font };

  const neoCardStyle = {
    backgroundColor: '#ffffff',
    border: '3px solid #000000',
    boxShadow: '5px 5px 0px 0px #000000',
    color: '#000000',
  };

  const neoAccentBadgeStyle = {
    backgroundColor: color || '#facc15', // yellow as fallback
    border: '2px solid #000000',
    boxShadow: '2px 2px 0px 0px #000000',
    color: '#000000',
  };

  return (
    <div className="p-6 h-full" style={{ ...fontStyle, backgroundColor: bgColor || '#f3f4f6', color: '#000000' }}>
      <div className="max-w-4xl mx-auto space-y-4 pb-4">
        {/* Header Block */}
        <header className="p-4 flex flex-col md:flex-row items-center gap-4" style={neoCardStyle}>
          {data.personal.photo && (
            <div className="w-20 h-20 relative border-4 border-black shadow-[3px_3px_0px_0px_#000] flex-shrink-0 bg-gray-100">
              <Image
                src={data.personal.photo}
                alt={data.personal.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left flex-grow space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tight leading-none border-b-2 border-black pb-1.5">{data.personal.name}</h1>
            <div className="inline-block px-2.5 py-0.5 font-bold text-xs" style={neoAccentBadgeStyle}>
              {data.personal.role}
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs font-bold pt-0.5">
              <a href={getMailtoLink(data.personal.email)} className="hover:underline flex items-center gap-1 border-b border-black"><Mail size={12} /> {data.personal.email}</a>
              <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 border-b border-black"><Phone size={12} /> {data.personal.phone}</a>
              <div className="flex items-center gap-1"><MapPin size={12} /> {data.personal.location}</div>
              {data.personal.website && (
                <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 border-b border-black"><Globe size={12} /> {data.personal.website}</a>
              )}
            </div>
          </div>
        </header>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Content (Left Column) */}
          <div className="md:col-span-2 space-y-4">
            {/* Profile */}
            {data.personal.description && (
              <section className="p-4 space-y-2" style={neoCardStyle}>
                <h2 className="text-sm font-black uppercase tracking-wide border-b-2 border-black pb-0.5 flex items-center gap-2">
                  <User size={16} />
                  {t(language, 'profile')}
                </h2>
                <p className="text-xs font-medium leading-relaxed whitespace-pre-line">{data.personal.description}</p>
              </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <section className="p-4 space-y-3" style={neoCardStyle}>
                <h2 className="text-sm font-black uppercase tracking-wide border-b-2 border-black pb-0.5 flex items-center gap-2">
                  <Briefcase size={16} />
                  {t(language, 'experience')}
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id} className="relative pl-4 border-l-4 border-black space-y-1">
                      <div className="absolute -left-2.5 top-1 w-4 h-4 bg-black border-2 border-white rounded-full"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="font-extrabold text-sm">{exp.role}</h3>
                        <span className="text-xs font-black bg-gray-100 border-2 border-black px-1.5 py-0.5 shadow-[1px_1px_0px_0px_#000]">{exp.date}</span>
                      </div>
                      <div className="text-xs font-bold" style={{ color }}>{exp.company}</div>
                      <div className="text-xs font-semibold leading-relaxed text-gray-800">
                        {exp.description.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section className="p-4 space-y-3" style={neoCardStyle}>
                <h2 className="text-sm font-black uppercase tracking-wide border-b-2 border-black pb-0.5 flex items-center gap-2">
                  <Code size={16} />
                  {t(language, 'projects')}
                </h2>
                <div className="space-y-3">
                  {data.projects.map(proj => (
                    <div key={proj.id} className="p-3 border-2 border-black space-y-1 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" style={{ boxShadow: '2px 2px 0px 0px #000' }}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-extrabold text-xs">{proj.name}</h3>
                        {proj.link && (
                          <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="text-xs font-bold border-b border-black hover:bg-black hover:text-white px-1">Link</a>
                        )}
                      </div>
                      {proj.description && <p className="text-xs font-medium text-gray-800">{proj.description}</p>}
                      <div className="text-xs font-bold text-gray-600">Tech: {proj.technologies}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-4">
            {/* Skills */}
            {data.skills && (
              <section className="p-4 space-y-2" style={neoCardStyle}>
                <h2 className="text-sm font-black uppercase tracking-wide border-b-2 border-black pb-0.5 flex items-center gap-2">
                  <Wrench size={16} />
                  {t(language, 'skills')}
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {data.skills.split(',').map((skill, index) => (
                    <span key={index} className="text-xs font-bold px-2 py-0.5" style={neoAccentBadgeStyle}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section className="p-4 space-y-3" style={neoCardStyle}>
                <h2 className="text-sm font-black uppercase tracking-wide border-b-2 border-black pb-0.5 flex items-center gap-2">
                  <GraduationCap size={16} />
                  {t(language, 'education')}
                </h2>
                <div className="space-y-3">
                  {data.education.map(edu => (
                    <div key={edu.id} className="space-y-1">
                      <h3 className="font-extrabold text-xs">{edu.degree}</h3>
                      <p className="text-xs font-bold text-gray-700">{edu.institution}</p>
                      <p className="text-xs font-bold text-gray-500">{edu.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
