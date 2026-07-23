"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, CheckSquare, Briefcase, GraduationCap, Code, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
    <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 flex items-center justify-center" style={{ backgroundColor: color }}>
            {icon}
        </div>
        <h2 className="text-xs font-bold uppercase" style={{ color: "#FFFFFF" }}>{title}</h2>
    </div>
);

const VectoristicPattern = ({ color }: { color: string }) => (
    <div className="absolute top-0 right-0 w-32 h-32 opacity-20" style={{ color }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <pattern id="dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dot-pattern)" />
        </svg>
    </div>
);

export const SmartStartTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const sidebarBgStyle = { backgroundColor: color };
    const sidebarTextStyle = { color: '#FFFFFF' };
    const mainBgStyle = { backgroundColor: bgColor };
    const mainTextStyle = { color: textColor };
    const mainAccentColorStyle = { color: color };
    const lightTextStyle = { color: textColor, opacity: 0.8 };

    return (
        <div className="flex h-full" style={fontStyle}>
            {/* Left Column (Sidebar) */}
            <aside className="w-1/3 p-6 flex flex-col gap-4 relative z-10" style={sidebarBgStyle}>
                <div className="absolute top-6 -right-6 z-20">
                    {data.personal.photo ? (
                        <div className="bg-white p-1.5 shadow-lg">
                            <div className="relative w-32 h-36 border-4 border-white">
                                <Image
                                    src={data.personal.photo}
                                    alt={data.personal.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border" style={{ borderColor: color }}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-1.5 shadow-lg">
                            <div className="relative w-32 h-36 border-4 border-white bg-slate-100 flex items-center justify-center">
                                <User className="w-12 h-12 text-slate-400" />
                                <div className="absolute inset-0 border" style={{ borderColor: color }}></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-44">
                    <section className="mb-4">
                        <SectionHeader icon={<CheckSquare size={12} color={color} />} title={t(language, 'contact')} color="white" />
                        <div className="space-y-1.5 text-xs" style={sidebarTextStyle}>
                            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Phone size={12} /> {data.personal.phone}</a>
                            {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Globe size={12} /> {data.personal.website}</a>}
                            <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2 hover:underline"><Mail size={12} /> {data.personal.email}</a>
                            <p className="flex items-center gap-2"><MapPin size={12} /> {data.personal.location}</p>
                        </div>
                    </section>
                    {data.skills && (
                        <section>
                            <SectionHeader icon={<CheckSquare size={12} color={color} />} title={t(language, 'skills')} color="white" />
                            <div className="space-y-1.5 text-xs" style={sidebarTextStyle}>
                                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                    <p key={skill}>{skill}</p>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Right Column (Main Content) */}
            <main className="w-2/3 p-6 relative overflow-hidden flex flex-col justify-between" style={mainBgStyle}>
                <VectoristicPattern color={color} />
                <div className="relative z-10">
                    <header className="mb-4">
                        <div className="p-2" style={{ backgroundColor: color }}>
                            <h1 className="text-2xl font-bold text-white uppercase">{data.personal.name}</h1>
                        </div>
                        <div className="p-2 border" style={{ borderColor: color }}>
                            <h2 className="text-sm font-semibold" style={mainAccentColorStyle}>{data.personal.role}</h2>
                        </div>
                        {data.personal.description && (
                            <p className="mt-2 text-xs whitespace-pre-line leading-relaxed" style={lightTextStyle}>
                                {data.personal.description}
                            </p>
                        )}
                    </header>
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-4">
                            <SectionHeader icon={<Briefcase size={12} color="white" />} title={t(language, 'workHistory')} color={color} />
                            <div className="space-y-3">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: color }}>
                                        <h3 className="font-bold text-xs" style={mainTextStyle}>{exp.role}</h3>
                                        <p className="font-semibold text-xs" style={mainAccentColorStyle}>{exp.company} | {exp.date}</p>
                                        <div className="text-xs mt-0.5 leading-relaxed" style={lightTextStyle}>
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
                    {data.education && data.education.length > 0 && (
                        <section className="mb-4">
                            <SectionHeader icon={<GraduationCap size={12} color="white" />} title={t(language, 'education')} color={color} />
                            <div className="space-y-3">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="border-l-2 pl-3" style={{ borderColor: color }}>
                                        <h3 className="font-bold text-xs" style={mainTextStyle}>{edu.degree}</h3>
                                        <p className="font-semibold text-xs" style={mainAccentColorStyle}>{edu.institution} | {edu.date}</p>
                                        {edu.description && <div className="text-xs mt-0.5 leading-relaxed" style={lightTextStyle}>{edu.description}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <SectionHeader icon={<Code size={12} color="white" />} title={t(language, 'projects')} color={color} />
                            <div className="space-y-3">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="border-l-2 pl-3" style={{ borderColor: color }}>
                                        <a href={getWebsiteLink(proj.link || '')} target="_blank" rel="noreferrer" className="font-bold text-xs hover:underline" style={mainAccentColorStyle}>{proj.name}</a>
                                        {proj.description && <p className="text-xs mt-0.5 leading-relaxed" style={lightTextStyle}>{proj.description}</p>}
                                        <p className="text-xs font-semibold mt-0.5" style={lightTextStyle}>Tech: {proj.technologies}</p>
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
