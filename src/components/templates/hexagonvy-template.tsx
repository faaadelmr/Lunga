
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

const SectionHeader = ({ title, color, textColor }: { title: string, color: string, textColor: string }) => (
    <div className='flex items-center gap-3 mb-4'>
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: textColor }}>{title}</h2>
    </div>
);

export const HexagonvyTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const lightTextStyle = { color: textColor, opacity: 0.7 };
    const lighterTextStyle = { color: textColor, opacity: 0.5 };
    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="p-8 h-full overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            {/* Header */}
            <header className="text-center mb-8 flex flex-col items-center">
                {data.personal.photo && (
                    <div className="relative w-40 h-44 mb-6" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        <div className="w-full h-full" style={{ backgroundColor: color }}>
                            <div className="relative w-full h-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', transform: 'scale(0.95)' }}>
                                <Image
                                    src={data.personal.photo}
                                    alt={data.personal.name}
                                    width={160}
                                    height={160}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <h1 className="text-4xl font-bold tracking-wider">{data.personal.name}</h1>
                <p className="text-md mt-1 mb-4 uppercase tracking-[0.2em]" style={lightTextStyle}>{data.personal.role}</p>

                <div className="w-full flex items-center justify-center gap-x-6 text-xs" style={lightTextStyle}>
                    <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Phone size={14} style={{ color }} /> {data.personal.phone}</a>
                    <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2 hover:underline"><Mail size={14} style={{ color }} /> {data.personal.email}</a>
                    {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Globe size={14} style={{ color }} /> {data.personal.website}</a>}
                    {data.personal.location && <p className="flex items-center gap-2"><MapPin size={14} style={{ color }} /> {data.personal.location}</p>}
                </div>
            </header>

            <div className="w-full h-px my-8" style={{ backgroundColor: textColor, opacity: 0.2 }}></div>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-x-12">
                {/* Left Column */}
                <aside className="col-span-5 space-y-8">
                    {data.personal.description && (
                        <section>
                            <SectionHeader title={t(language, 'profile')} color={color} textColor={textColor} />
                            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
                        </section>
                    )}
                    {skills.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'skills')} color={color} textColor={textColor} />
                            <ul className="space-y-1 text-sm list-disc list-inside" style={lightTextStyle}>
                                {skills.map(skill => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'projects')} color={color} textColor={textColor} />
                            <div className="space-y-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="text-sm">
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold hover:underline" style={{ color }}>{proj.name}</a>
                                        <p className="text-xs mt-1" style={lightTextStyle}>{proj.description}</p>
                                        <p className="text-xs mt-1 font-semibold" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Column */}
                <main className="col-span-7 space-y-8">
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'workHistory')} color={color} textColor={textColor} />
                            <div className="space-y-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="grid grid-cols-3 gap-x-4">
                                        <div className="col-span-1 text-sm text-right" style={lightTextStyle}>
                                            <p className="font-semibold">{exp.date}</p>
                                            <p>{exp.company}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <h3 className="font-bold uppercase text-md">{exp.role}</h3>
                                            <div className="text-sm prose max-w-none mt-1" style={lightTextStyle}>
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
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'education')} color={color} textColor={textColor} />
                            <div className="space-y-6">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="grid grid-cols-3 gap-x-4">
                                        <div className="col-span-1 text-sm text-right" style={lightTextStyle}>
                                            <p className="font-semibold">{edu.date}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <h3 className="font-bold uppercase text-md">{edu.degree}</h3>
                                            <p className="text-sm -mt-1" style={lightTextStyle}>{edu.institution}</p>
                                            {edu.description && <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={lightTextStyle}>{edu.description}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};
