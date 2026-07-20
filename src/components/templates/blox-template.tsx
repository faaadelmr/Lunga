
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, Gamepad2, Layers, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

const SectionHeader = ({ title, color, textColor, icon }: { title: string, color: string, textColor: string, icon: React.ReactNode }) => (
    <div
        className="flex items-center gap-2 mb-2 px-2.5 py-1 border-2"
        style={{
            backgroundColor: `${color}20`,
            borderColor: color,
            boxShadow: `3px 3px 0px ${color}`
        }}
    >
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        <h2 className={themeStandards.typography.sectionTitle} style={{ color: textColor }}>{title}</h2>
    </div>
);

export const BloxTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    // Force Space Grotesk font for the Roblox theme
    const fontStyle = { fontFamily: 'Space Grotesk, sans-serif' };
    const lightTextStyle = { color: textColor, opacity: 0.8 };
    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="h-full p-4 overflow-y-auto" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            <div className="h-full border-4 p-3" style={{ borderColor: textColor }}>
                {/* Header */}
                <header className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-grow">
                        <h1 className={themeStandards.typography.name} style={{ color: color }}>{data.personal.name}</h1>
                        <p className={themeStandards.typography.body} style={lightTextStyle}>{data.personal.role}</p>
                    </div>
                    {data.personal.photo && (
                        <div
                            className="w-20 h-20 relative flex-shrink-0 border-4 bg-gray-300"
                            style={{ borderColor: textColor }}
                        >
                            <Image
                                src={data.personal.photo}
                                alt={data.personal.name}
                                width={80}
                                height={80}
                                className="object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                    )}
                </header>

                {/* Profile Description */}
                {data.personal.description && (
                    <section className="mb-4">
                        <p className="text-xs whitespace-pre-line border-2 p-2" style={{ borderColor: `${textColor}40` }}>{data.personal.description}</p>
                    </section>
                )}

                {/* Main Content Grid */}
                <main className="grid grid-cols-3 gap-4">
                    {/* Left Column */}
                    <div className="col-span-2 space-y-4">
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'experience')} icon={<Briefcase size={16} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="space-y-3">
                                    {data.experience.map(exp => (
                                        <div key={exp.id} className="pl-2">
                                            <h3 className="font-bold text-sm">{exp.role}</h3>
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-xs font-semibold" style={{ color: color }}>{exp.company}</p>
                                                <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                                            </div>
                                            <div className="text-xs max-w-none mt-0.5 space-y-1" style={lightTextStyle}>
                                                {exp.description.split('\n')
                                                    .map(line => line.trim())
                                                    .filter(line => line.length > 0)
                                                    .map((line, i) => (
                                                        <div key={i} className="flex items-start gap-1.5">
                                                            <span className="flex-shrink-0 select-none">•</span>
                                                            <span className="flex-grow w-0">{line.replace(/^[-*•]\s*/, '')}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'education')} icon={<GraduationCap size={16} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="space-y-3">
                                    {data.education.map(edu => (
                                        <div key={edu.id} className="pl-2">
                                            <h3 className="font-bold text-sm">{edu.degree}</h3>
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-xs font-semibold" style={{ color: color }}>{edu.institution}</p>
                                                <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'projects')} icon={<Code size={16} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="space-y-3">
                                    {data.projects.map(proj => (
                                        <div key={proj.id} className="pl-2">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold text-sm" style={{ color }}>{proj.name}</h3>
                                                {proj.link && (
                                                    <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="text-xs font-bold border-b border-black hover:bg-black hover:text-white px-1">Link</a>
                                                )}
                                            </div>
                                            {proj.description && <div className="text-xs max-w-none mt-0.5" style={lightTextStyle}>{proj.description}</div>}
                                            <p className="text-xs font-semibold mt-0.5" style={lightTextStyle}>Tech: {proj.technologies}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <aside className="col-span-1 space-y-4">
                        <section>
                            <SectionHeader title={t(language, 'contact')} icon={<User size={16} style={{ color }} />} color={color} textColor={textColor} />
                            <div className="space-y-1.5 text-xs" style={lightTextStyle}>
                                <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-1.5 break-all hover:underline"><Mail size={12} /> {data.personal.email}</a>
                                <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Phone size={12} /> {data.personal.phone}</a>
                                <p className="flex items-center gap-1.5"><MapPin size={12} /> {data.personal.location}</p>
                                {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 break-all hover:underline"><Globe size={12} /> {data.personal.website}</a>}
                            </div>
                        </section>
                        {skills.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'skills')} icon={<Layers size={16} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="flex flex-wrap gap-1.5">
                                    {skills.map(skill => (
                                        <span key={skill} className="text-xs font-bold py-0.5 px-1.5 border-2" style={{ borderColor: `${textColor}80`, color: textColor }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>
                </main>
            </div>
        </div>
    );
};
