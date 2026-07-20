"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

export const DeveloperCliTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const baseTextColor = { color: textColor };
  const contrastTextColor = themeStandards.colors.getContrastText(bgColor);

  const isLight = themeStandards.colors.isLight(bgColor);
  const cardBg = isLight ? '#ffffff' : '#1e1e1e';
  const headerBg = isLight ? '#f6f8fa' : '#2d333b';
  const detailBg = isLight ? '#f6f8fa' : '#22272e';
  const borderColor = isLight ? '#d0d7de' : '#3e3e3e';
  const promptText = isLight ? '#57606a' : '#adbac7';
  
  // High contrast color replacements for terminal highlights
  const cliAccent = color; 
  const commandColor = isLight ? '#cf222e' : '#f47067';
  const codeColor = isLight ? '#0550ae' : '#6cb6ff';

  return (
    <div className={`${themeStandards.spacing.containerClass} ${themeStandards.spacing.containerPadding}`} style={{ fontFamily: 'monospace', backgroundColor: bgColor, color: textColor }}>
      {/* Terminal Window Frame */}
      <div className="border rounded-lg overflow-hidden shadow-2xl h-full flex flex-col" style={{ borderColor, backgroundColor: cardBg }}>
        {/* Title Bar */}
        <div className="border-b px-4 py-2 flex items-center justify-between" style={{ backgroundColor: headerBg, borderColor, color: promptText }}>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs font-semibold flex items-center gap-1.5">
            <span>cv-lization.sh — bash</span>
          </div>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Terminal Content */}
        <div className="p-4 space-y-4 text-xs overflow-y-auto flex-grow" style={{ color: textColor }}>
          {/* Prompt 1: Whoami */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span style={{ color: cliAccent }}>➜</span>
              <span className="text-[#1a7f37]">~</span>
              <span style={{ color: commandColor }}>whoami</span>
            </div>
            <div className="pl-3 flex flex-col md:flex-row items-center gap-4 p-3 rounded border" style={{ backgroundColor: detailBg, borderColor }}>
              {data.personal.photo && (
                <div className="w-16 h-16 relative rounded overflow-hidden border flex-shrink-0" style={{ borderColor }}>
                  <Image
                    src={data.personal.photo}
                    alt={data.personal.name}
                    fill
                    className="object-cover transition-all duration-300"
                  />
                </div>
              )}
              <div className="space-y-1 text-center md:text-left">
                <div className="font-bold text-sm" style={{ color: cliAccent }}>{data.personal.name}</div>
                <div className="font-semibold" style={{ color: codeColor }}>{data.personal.role}</div>
                <div className="text-xs flex flex-wrap items-center justify-center md:justify-start gap-x-3 mt-1.5" style={{ color: promptText }}>
                  <a href={getMailtoLink(data.personal.email)} className="hover:underline flex items-center gap-1"><Mail size={12} /> {data.personal.email}</a>
                  <span>|</span>
                  <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1"><Phone size={12} /> {data.personal.phone}</a>
                  <span>|</span>
                  <div className="flex items-center gap-1"><MapPin size={12} /> {data.personal.location}</div>
                  {data.personal.website && (
                    <>
                      <span>|</span>
                      <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: cliAccent }}><Globe size={12} /> {data.personal.website}</a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Prompt 2: cat profile.txt */}
          {data.personal.description && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span style={{ color: cliAccent }}>➜</span>
                <span className="text-[#1a7f37]">~</span>
                <span style={{ color: commandColor }}>cat</span>
                <span style={{ color: cliAccent }}>profile.txt</span>
              </div>
              <div className="pl-4 leading-relaxed whitespace-pre-line border-l" style={{ borderColor, color: isLight ? '#116329' : '#85e5b5' }}>
                {data.personal.description}
              </div>
            </div>
          )}

          {/* Prompt 3: experience --list */}
          {data.experience && data.experience.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span style={{ color: cliAccent }}>➜</span>
                <span className="text-[#1a7f37]">~</span>
                <span style={{ color: commandColor }}>experience</span>
                <span style={{ color: cliAccent }}>--list</span>
              </div>
              <div className="pl-3 space-y-3 border-l" style={{ borderColor }}>
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between font-bold" style={{ color: isLight ? '#8250df' : '#d3bdf0' }}>
                      <span>[ {exp.role} @ {exp.company} ]</span>
                      <span className="text-xs font-mono" style={{ color: promptText }}>{exp.date}</span>
                    </div>
                    <div className="text-xs opacity-90 pl-2 space-y-1">
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
            </div>
          )}

          {/* Prompt 4: cat projects.json */}
          {data.projects && data.projects.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span style={{ color: cliAccent }}>➜</span>
                <span className="text-[#1a7f37]">~</span>
                <span style={{ color: commandColor }}>cat</span>
                <span style={{ color: cliAccent }}>projects.json</span>
              </div>
              <div className="pl-3 border-l" style={{ borderColor }}>
                <pre className="text-xs whitespace-pre-wrap break-words p-2 rounded border leading-relaxed" style={{ color: codeColor, backgroundColor: detailBg, borderColor }}>
                  {JSON.stringify(
                    data.projects.map(p => ({
                      name: p.name,
                      description: p.description,
                      tech: `[ ${p.technologies.split(',').map(s => s.trim()).join(', ')} ]`,
                      ...(p.link ? { url: p.link } : {})
                    })),
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          )}

          {/* Prompt 5: cat skills.log & education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span style={{ color: cliAccent }}>➜</span>
                  <span className="text-[#1a7f37]">~</span>
                  <span style={{ color: commandColor }}>cat</span>
                  <span style={{ color: cliAccent }}>skills.log</span>
                </div>
                <div className="pl-3 border-l flex flex-wrap gap-1.5" style={{ borderColor }}>
                  {data.skills.split(',').map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-xs border" style={{ color: cliAccent, backgroundColor: detailBg, borderColor }}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.education && data.education.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span style={{ color: cliAccent }}>➜</span>
                  <span className="text-[#1a7f37]">~</span>
                  <span style={{ color: commandColor }}>education</span>
                  <span style={{ color: cliAccent }}>--show</span>
                </div>
                <div className="pl-3 border-l space-y-1" style={{ borderColor }}>
                  {data.education.map(edu => (
                    <div key={edu.id} className={themeStandards.typography.body}>
                      <div className="font-bold" style={{ color: codeColor }}>{edu.degree}</div>
                      <div style={{ color: promptText }}>{edu.institution} ({edu.date})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blinking Cursor prompt */}
          <div className="flex items-center gap-2 pt-2">
            <span style={{ color: cliAccent }}>➜</span>
            <span className="text-[#1a7f37]">~</span>
            <span className="w-2.5 h-4 animate-pulse" style={{ backgroundColor: textColor }}></span>
          </div>

        </div>
      </div>
    </div>
  );
};
