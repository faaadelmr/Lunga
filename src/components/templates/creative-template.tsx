"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, Globe, User, Briefcase, GraduationCap, Star, Heart, MapPin, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

// Helper function to determine if a color is light or dark
const isColorLight = (hexColor: string) => {
  if (!hexColor.startsWith('#')) return false;
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return false;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

export const CreativeTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const fontStyle = { fontFamily: font };

  // Use a dark color for the sidebar, ignoring user's bgColor selection for this specific template style
  const sidebarBgColor = '#2C3E50'; // A dark blue-gray
  const sidebarTextColor = '#FFFFFF'; // White text on dark sidebar
  const iconColor = isColorLight(color) ? '#000000' : '#FFFFFF';

  const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <section className="mb-5">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <h2 className="text-lg font-bold" style={{ color: textColor }}>{title}</h2>
      </div>
      <div className="border-l-2 pl-6 ml-4" style={{ borderColor: color }}>
        {children}
      </div>
    </section>
  );

  return (
    <div className="flex h-full" style={{ ...fontStyle, backgroundColor: bgColor }}>
      {/* Left Sidebar */}
      <div className="w-1/3 text-white overflow-y-auto relative" style={{ backgroundColor: sidebarBgColor, color: sidebarTextColor }}>
        {/* Subtle grid pattern for the sidebar */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Curved Header Background */}
        <div className="h-44 relative" style={{ backgroundColor: color, borderBottomLeftRadius: '50% 30px', borderBottomRightRadius: '50% 30px' }}>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-black/20 blur-lg pointer-events-none"></div>
        </div>
        <div className="px-8 -mt-24 relative z-10">
          {data.personal.photo ? (
            <div className="relative w-40 h-40 mx-auto rounded-full border-4 overflow-hidden shadow-lg" style={{ borderColor: color }}>
              <Image
                src={data.personal.photo}
                alt={data.personal.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-40 h-40 mx-auto"></div> // Placeholder to maintain layout
          )}
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold tracking-wide">{data.personal.name}</h1>
            <p className="text-sm font-light mt-1" style={{ color: sidebarTextColor, opacity: 0.8 }}>{data.personal.role}</p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider border-b pb-1.5 mb-3 flex items-center gap-2" style={{ borderColor: `${color}40`, color: color }}>
                <Phone size={14} /> {t(language, 'contact')}
              </h3>
              <div className="space-y-2.5 text-xs" style={{ color: sidebarTextColor, opacity: 0.9 }}>
                <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2.5 p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Mail size={12} style={{ color }} />
                  <span className="truncate">{data.personal.email}</span>
                </a>
                <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Phone size={12} style={{ color }} />
                  <span className="truncate">{data.personal.phone}</span>
                </a>
                {data.personal.website && (
                  <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Globe size={12} style={{ color }} />
                    <span className="truncate">{data.personal.website}</span>
                  </a>
                )}
              </div>
            </div>

            {data.skills && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider border-b pb-1.5 mb-3 flex items-center gap-2" style={{ borderColor: `${color}40`, color: color }}>
                  <Star size={14} /> {t(language, 'skills')}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.split(',').map((skill, index) => (
                    <span key={index} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-2/3 p-8 overflow-y-auto" style={{ color: textColor }}>
        {data.personal.description && (
          <Section icon={<User size={16} style={{ color: iconColor }} />} title={t(language, 'profile')}>
            <p className="text-sm leading-relaxed whitespace-pre-line opacity-90">{data.personal.description}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section icon={<Briefcase size={16} style={{ color: iconColor }} />} title={t(language, 'experience')}>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-md" style={{ color: textColor }}>{exp.role}</h3>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${color}20`, color: textColor }}>{exp.date}</span>
                  </div>
                  <p className="text-xs font-medium mb-2 opacity-80" style={{ color: textColor }}>{exp.company}</p>
                  <div className="text-xs space-y-1 opacity-90 leading-relaxed">
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
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section icon={<GraduationCap size={16} style={{ color: iconColor }} />} title={t(language, 'education')}>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm" style={{ color: textColor }}>{edu.degree}</h3>
                    <span className="text-xs opacity-75">{edu.date}</span>
                  </div>
                  <p className="text-xs opacity-80" style={{ color: textColor }}>{edu.institution}</p>
                  {edu.description && <p className="text-xs mt-1 opacity-90 whitespace-pre-line">{edu.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section icon={<Code size={16} style={{ color: iconColor }} />} title={t(language, 'projects')}>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-sm hover:underline" style={{ color: textColor }}>{proj.name}</a>
                  </div>
                  <p className="text-xs opacity-90 mt-0.5">{proj.description}</p>
                  <p className="text-xs font-medium opacity-75 mt-0.5">Technologies: {proj.technologies}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};
