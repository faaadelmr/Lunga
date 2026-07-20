"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

export const GlassmorphismTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const fontStyle = { fontFamily: font };
  const baseTextColor = { color: textColor };
  
  // Custom glass card styling
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
  };

  const badgeStyle = {
    backgroundColor: `${color}33`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: textColor,
  };

  return (
    <div className="p-8 h-full overflow-y-auto relative" style={{ ...fontStyle, backgroundColor: bgColor || '#0f172a', ...baseTextColor }}>
      {/* Background Glow effects */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full filter blur-[80px] opacity-25" style={{ backgroundColor: color }}></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full filter blur-[100px] opacity-20" style={{ backgroundColor: '#c084fc' }}></div>

      <div className="relative z-10 space-y-6">
        {/* Header Glass Card */}
        <header className="p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6" style={cardStyle}>
          {data.personal.photo && (
            <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
              <Image
                src={data.personal.photo}
                alt={data.personal.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left flex-grow space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{data.personal.name}</h1>
            <p className="text-lg font-medium" style={{ color: color }}>{data.personal.role}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs opacity-90 mt-2">
              <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-1 hover:underline"><Mail size={12} /> {data.personal.email}</a>
              <span className="opacity-40">&bull;</span>
              <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><Phone size={12} /> {data.personal.phone}</a>
              <span className="opacity-40">&bull;</span>
              <div className="flex items-center gap-1"><MapPin size={12} /> {data.personal.location}</div>
              {data.personal.website && (
                <>
                  <span className="opacity-40">&bull;</span>
                  <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1"><Globe size={12} /> {data.personal.website}</a>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile */}
            {data.personal.description && (
              <section className="p-6 rounded-2xl space-y-3" style={cardStyle}>
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                  <User size={18} style={{ color }} />
                  {t(language, 'profile')}
                </h2>
                <p className="text-sm leading-relaxed opacity-95 whitespace-pre-line">{data.personal.description}</p>
              </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <section className="p-6 rounded-2xl space-y-4" style={cardStyle}>
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                  <Briefcase size={18} style={{ color }} />
                  {t(language, 'experience')}
                </h2>
                <div className="space-y-4">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.role}</h3>
                        <span className="text-xs font-mono opacity-80">{exp.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold" style={{ color }}>{exp.company}</h4>
                      <div className="text-xs leading-relaxed opacity-90 mt-1">
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
              <section className="p-6 rounded-2xl space-y-4" style={cardStyle}>
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                  <Code size={18} style={{ color }} />
                  {t(language, 'projects')}
                </h2>
                <div className="space-y-4">
                  {data.projects.map(proj => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        {proj.link && (
                          <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={{ color }}>Link</a>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">{proj.description}</p>
                      <p className="text-xs font-mono opacity-80 mt-1">Tech: {proj.technologies}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            {data.skills && (
              <section className="p-6 rounded-2xl space-y-3" style={cardStyle}>
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                  <Wrench size={18} style={{ color }} />
                  {t(language, 'skills')}
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {data.skills.split(',').map((skill, index) => (
                    <span key={index} className="text-xs px-2.5 py-1 rounded-md" style={badgeStyle}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section className="p-6 rounded-2xl space-y-3" style={cardStyle}>
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                  <GraduationCap size={18} style={{ color }} />
                  {t(language, 'education')}
                </h2>
                <div className="space-y-3">
                  {data.education.map(edu => (
                    <div key={edu.id} className="space-y-0.5">
                      <h3 className="font-bold text-sm">{edu.degree}</h3>
                      <p className="text-xs opacity-90">{edu.institution}</p>
                      <p className="text-xs opacity-85 font-mono">{edu.date}</p>
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
