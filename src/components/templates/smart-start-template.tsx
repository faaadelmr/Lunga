
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, CheckSquare, Briefcase, GraduationCap, Star, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 flex items-center justify-center" style={{ backgroundColor: color }}>
            {icon}
        </div>
        <h2 className="text-xl font-bold uppercase" style={{ color: "#FFFFFF" }}>{title}</h2>
    </div>
);

const VectoristicPattern = ({ color }: { color: string }) => (
    <div className="absolute top-0 right-0 w-48 h-48 opacity-20" style={{ color }}>
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
            <aside className="w-1/3 p-8 flex flex-col gap-8 relative z-10" style={sidebarBgStyle}>
                <div className="absolute top-8 -right-8 z-20">
                    {data.personal.photo ? (
                        <div className="bg-white p-2 shadow-lg">
                            <div className="relative w-48 h-56 border-8 border-white">
                                <Image
                                    src={data.personal.photo}
                                    alt={data.personal.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border-2" style={{ borderColor: color }}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-48 h-56" style={{ backgroundColor: `${color}99` }}></div>
                    )}
                </div>

                <div className={data.personal.photo ? "mt-64" : "mt-8"}>
                    <section className="mb-8">
                        <SectionHeader icon={<CheckSquare size={16} color={color} />} title={t(language, 'contact')} color="white" />
                        <div className="space-y-3 text-sm" style={sidebarTextStyle}>
                            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><Phone size={14} /> {data.personal.phone}</a>
                            {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><Globe size={14} /> {data.personal.website}</a>}
                            <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-3 hover:underline"><Mail size={14} /> {data.personal.email}</a>
                            <p className="flex items-center gap-3"><MapPin size={14} /> {data.personal.location}</p>
                        </div>
                    </section>
                    {data.skills && (
                        <section>
                            <SectionHeader icon={<CheckSquare size={16} color={color} />} title={t(language, 'skills')} color="white" />
                            <div className="space-y-2 text-sm" style={sidebarTextStyle}>
                                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                    <p key={skill}>{skill}</p>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Right Column (Main Content) */}
            <main className="w-2/3 p-8 relative overflow-hidden" style={mainBgStyle}>
                <VectoristicPattern color={color} />
                <div className="relative z-10">
                    <header className="mb-8">
                        <div className="p-4" style={{ backgroundColor: color }}>
                            <h1 className="text-4xl font-bold text-white uppercase">{data.personal.name}</h1>
                        </div>
                        <div className="p-4 border" style={{ borderColor: color }}>
                            <h2 className="text-2xl font-semibold" style={mainAccentColorStyle}>{data.personal.role}</h2>
                        </div>
                        {data.personal.description && (
                            <p className="mt-4 text-sm whitespace-pre-line" style={lightTextStyle}>
                                {data.personal.description}
                            </p>
                        )}
                    </header>
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <SectionHeader icon={<Briefcase size={16} color="white" />} title={t(language, 'workHistory')} color={color} />
                            <div className="space-y-4">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: color }}>
                                        <h3 className="font-bold text-lg" style={mainTextStyle}>{exp.role}</h3>
                                        <p className="font-semibold" style={mainAccentColorStyle}>{exp.company} | {exp.date}</p>
                                        <div className="text-sm mt-1 prose max-w-none" style={lightTextStyle}>
                                            {exp.description.split('\n').map((line, i) => (
                                                <div key={i}>{line}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <SectionHeader icon={<GraduationCap size={16} color="white" />} title={t(language, 'education')} color={color} />
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: color }}>
                                        <h3 className="font-bold text-lg" style={mainTextStyle}>{edu.degree}</h3>
                                        <p className="font-semibold" style={mainAccentColorStyle}>{edu.institution} | {edu.date}</p>
                                        <div className="text-sm mt-1 whitespace-pre-line prose max-w-none" style={lightTextStyle}>{edu.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <SectionHeader icon={<Code size={16} color="white" />} title={t(language, 'projects')} color={color} />
                            <div className="space-y-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="border-l-2 pl-4" style={{ borderColor: color }}>
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-lg hover:underline" style={mainAccentColorStyle}>{proj.name}</a>
                                        <p className="text-sm mt-1" style={lightTextStyle}>{proj.description}</p>
                                        <p className="text-sm mt-1 font-semibold" style={lightTextStyle}>Teknologi: {proj.technologies}</p>
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
