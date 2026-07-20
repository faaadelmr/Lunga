"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

export const DeveloperCliTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const baseTextColor = { color: textColor };

  return (
    <div className="p-6 h-full bg-[#f6f8fa] text-[#24292f] font-mono select-none" style={{ fontFamily: 'monospace' }}>
      {/* Terminal Window Frame */}
      <div className="border border-[#d0d7de] rounded-lg overflow-hidden shadow-2xl bg-[#ffffff]">
        {/* Title Bar */}
        <div className="bg-[#f6f8fa] border-b border-[#d0d7de] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs text-[#57606a] font-semibold flex items-center gap-1.5">
            <span>cv-lization.sh — bash</span>
          </div>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-6 text-xs md:text-sm">
          {/* Welcome Message */}
          <div className="text-[#57606a] border-b border-[#d0d7de] pb-2">
            <span>Last login: {new Date().toDateString()} on ttys001</span>
          </div>

          {/* Prompt 1: Whoami */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#0969da]">➜</span>
              <span className="text-[#1a7f37]">~</span>
              <span className="text-[#cf222e]">whoami</span>
            </div>
            <div className="pl-4 flex flex-col md:flex-row items-center gap-6 bg-[#f6f8fa] p-4 rounded border border-[#d0d7de]">
              {data.personal.photo && (
                <div className="w-20 h-20 relative rounded overflow-hidden border border-[#d0d7de] flex-shrink-0">
                  <Image
                    src={data.personal.photo}
                    alt={data.personal.name}
                    fill
                    className="object-cover transition-all duration-300"
                  />
                </div>
              )}
              <div className="space-y-1 text-center md:text-left">
                <div className="text-[#953800] font-bold text-lg">{data.personal.name}</div>
                <div className="text-[#0969da]">{data.personal.role}</div>
                <div className="text-[#57606a] text-xs flex flex-wrap items-center justify-center md:justify-start gap-x-3 mt-1.5">
                  <a href={getMailtoLink(data.personal.email)} className="hover:underline flex items-center gap-1"><Mail size={12} /> {data.personal.email}</a>
                  <span>|</span>
                  <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1"><Phone size={12} /> {data.personal.phone}</a>
                  <span>|</span>
                  <div className="flex items-center gap-1"><MapPin size={12} /> {data.personal.location}</div>
                  {data.personal.website && (
                    <>
                      <span>|</span>
                      <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color }}><Globe size={12} /> {data.personal.website}</a>
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
                <span className="text-[#0969da]">➜</span>
                <span className="text-[#1a7f37]">~</span>
                <span className="text-[#cf222e]">cat</span>
                <span className="text-[#953800]">profile.txt</span>
              </div>
              <div className="pl-4 text-[#116329] leading-relaxed whitespace-pre-line border-l border-[#d0d7de]">
                {data.personal.description}
              </div>
            </div>
          )}

          {/* Prompt 3: experience --list */}
          {data.experience && data.experience.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#0969da]">➜</span>
                <span className="text-[#1a7f37]">~</span>
                <span className="text-[#cf222e]">experience</span>
                <span className="text-[#953800]">--list</span>
              </div>
              <div className="pl-4 space-y-4 border-l border-[#d0d7de]">
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-[#8250df]">
                      <span>[ {exp.role} @ {exp.company} ]</span>
                      <span className="text-[#57606a] text-xs font-mono">{exp.date}</span>
                    </div>
                    <div className="text-[#24292f] text-xs opacity-90 pl-2">
                      {exp.description.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
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
                <span className="text-[#0969da]">➜</span>
                <span className="text-[#1a7f37]">~</span>
                <span className="text-[#cf222e]">cat</span>
                <span className="text-[#953800]">projects.json</span>
              </div>
              <div className="pl-4 border-l border-[#d0d7de]">
                <pre className="text-[#0550ae] text-xs overflow-x-auto bg-[#f6f8fa] p-3 rounded border border-[#d0d7de] leading-relaxed">
                  {JSON.stringify(
                    data.projects.map(p => ({
                      name: p.name,
                      description: p.description,
                      tech: p.technologies.split(',').map(s => s.trim()),
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#0969da]">➜</span>
                  <span className="text-[#1a7f37]">~</span>
                  <span className="text-[#cf222e]">cat</span>
                  <span className="text-[#953800]">skills.log</span>
                </div>
                <div className="pl-4 border-l border-[#d0d7de] text-[#24292f] flex flex-wrap gap-2">
                  {data.skills.split(',').map((skill, i) => (
                    <span key={i} className="bg-[#f6f8fa] px-2 py-0.5 rounded text-xs text-[#953800] border border-[#d0d7de]">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.education && data.education.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#0969da]">➜</span>
                  <span className="text-[#1a7f37]">~</span>
                  <span className="text-[#cf222e]">education</span>
                  <span className="text-[#953800]">--show</span>
                </div>
                <div className="pl-4 border-l border-[#d0d7de] space-y-2">
                  {data.education.map(edu => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold text-[#0969da]">{edu.degree}</div>
                      <div className="text-[#57606a]">{edu.institution} ({edu.date})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blinking Cursor prompt */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[#0969da]">➜</span>
            <span className="text-[#1a7f37]">~</span>
            <span className="w-2.5 h-4 bg-[#24292f] animate-pulse"></span>
          </div>

        </div>
      </div>
    </div>
  );
};
