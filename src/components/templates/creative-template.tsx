
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
        
        <div className="h-48 relative overflow-hidden" style={{ backgroundColor: color }}>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-black/20 blur-lg"></div>
          {/* Wave transition shape */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-6 fill-current" style={{ color: sidebarBgColor }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.35,27.35,172.56,49.8,249.29,61.64,321.39,56.44Z"></path>
            </svg>
          </div>
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
                  {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                    <span key={skill} className="text-[11px] py-1 px-2.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-10 overflow-y-auto">
        {data.personal.description && (
          <Section icon={<User size={18} color={iconColor} />} title={t(language, 'profile')}>
            <p className="text-sm whitespace-pre-line" style={{ color: textColor, opacity: 0.8 }}>{data.personal.description}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section icon={<Briefcase size={18} color={iconColor} />} title={t(language, 'experience')}>
            {data.experience.map(exp => (
              <div key={exp.id} className="pb-3.5">
                <h3 className="text-sm font-bold" style={{ color: textColor }}>{exp.role}</h3>
                <div className="flex justify-between items-center text-xs mt-0.5 mb-1.5">
                  <span className="font-semibold" style={{ color: textColor, opacity: 0.9 }}>{exp.company}</span>
                  <span className="text-gray-500 font-mono">{exp.date}</span>
                </div>
                <div className="text-xs prose max-w-none" style={{ color: textColor, opacity: 0.8 }}>
                  {exp.description.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section icon={<GraduationCap size={18} color={iconColor} />} title={t(language, 'education')}>
            {data.education.map(edu => (
              <div key={edu.id} className="pb-3.5">
                <h3 className="text-sm font-bold" style={{ color: textColor }}>{edu.degree}</h3>
                <div className="flex justify-between items-center text-xs mt-0.5">
                  <span className="font-semibold" style={{ color: textColor, opacity: 0.9 }}>{edu.institution}</span>
                  <span className="text-gray-500 font-mono">{edu.date}</span>
                </div>
                {edu.description && <div className="text-xs whitespace-pre-line prose max-w-none mt-1" style={{ color: textColor, opacity: 0.8 }}>{edu.description}</div>}
              </div>
            ))}
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section icon={<Code size={18} color={iconColor} />} title={t(language, 'projects')}>
            {data.projects.map(proj => (
              <div key={proj.id} className="pb-3.5">
                <h3 className="text-sm font-bold" style={{ color: textColor }}>{proj.name}</h3>
                {proj.link && (
                  <div className="text-xs mt-0.5" style={{ color: textColor, opacity: 0.8 }}>
                    Link: <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline break-all" style={{ color: color }}>{proj.link}</a>
                  </div>
                )}
                <p className="text-xs whitespace-pre-line mt-1" style={{ color: textColor, opacity: 0.8 }}>{proj.description}</p>
                <p className="text-xs font-semibold mt-1.5" style={{ color: textColor, opacity: 0.9 }}>Technologies: {proj.technologies}</p>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};
