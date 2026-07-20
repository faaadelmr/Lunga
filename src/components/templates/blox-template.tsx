
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, Gamepad2, Layers, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const SectionHeader = ({ title, color, textColor, icon }: { title: string, color: string, textColor: string, icon: React.ReactNode }) => (
    <div
        className="flex items-center gap-3 mb-4 px-3 py-2 border-2"
        style={{
            backgroundColor: `${color}20`,
            borderColor: color,
            boxShadow: `4px 4px 0px ${color}`
        }}
    >
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <h2 className="text-xl font-bold uppercase" style={{ color: textColor }}>{title}</h2>
    </div>
);

export const BloxTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    // Force Space Grotesk font for the Roblox theme
    const fontStyle = { fontFamily: 'Space Grotesk, sans-serif' };
    const lightTextStyle = { color: textColor, opacity: 0.8 };
    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="h-full p-6 overflow-y-auto" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            <div className="h-full border-4 p-4" style={{ borderColor: textColor }}>
                {/* Header */}
                <header className="flex items-start justify-between gap-6 mb-6">
                    <div className="flex-grow">
                        <h1 className="text-5xl font-bold uppercase" style={{ color: color }}>{data.personal.name}</h1>
                        <p className="text-2xl font-semibold mt-1" style={lightTextStyle}>{data.personal.role}</p>
                    </div>
                    {data.personal.photo && (
                        <div
                            className="w-28 h-28 relative flex-shrink-0 border-4 bg-gray-300"
                            style={{ borderColor: textColor }}
                        >
                            <Image
                                src={data.personal.photo}
                                alt={data.personal.name}
                                width={112}
                                height={112}
                                className="object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                    )}
                </header>

                {/* Profile Description */}
                {data.personal.description && (
                    <section className="mb-6">
                        <p className="text-md whitespace-pre-line border-2 p-3" style={{ borderColor: `${textColor}40` }}>{data.personal.description}</p>
                    </section>
                )}

                {/* Main Content Grid */}
                <main className="grid grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="col-span-2 space-y-6">
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'experience')} icon={<Briefcase size={20} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="space-y-4">
                                    {data.experience.map(exp => (
                                        <div key={exp.id} className="pl-4">
                                            <h3 className="font-bold text-lg">{exp.role}</h3>
                                            <div className="flex justify-between items-baseline">
                                                <p className="font-semibold" style={{ color: color }}>{exp.company}</p>
                                                <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                                            </div>
                                            <div className="text-sm prose max-w-none mt-1" style={lightTextStyle}>
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
                            <section>
                                <SectionHeader title={t(language, 'education')} icon={<GraduationCap size={20} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="space-y-4">
                                    {data.education.map(edu => (
                                        <div key={edu.id} className="pl-4">
                                            <h3 className="font-bold text-lg">{edu.degree}</h3>
                                            <div className="flex justify-between items-baseline">
                                                <p className="font-semibold" style={{ color: color }}>{edu.institution}</p>
                                                <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'projects')} icon={<Code size={20} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="space-y-4">
                                    {data.projects.map(proj => (
                                        <div key={proj.id} className="pl-4">
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-lg hover:underline" style={{ color }}>{proj.name}</a>
                                            <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={lightTextStyle}>{proj.description}</div>
                                            <p className="text-sm font-semibold mt-1" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <aside className="col-span-1 space-y-6">
                        <section>
                            <SectionHeader title={t(language, 'contact')} icon={<User size={20} style={{ color }} />} color={color} textColor={textColor} />
                            <div className="space-y-2 text-sm" style={lightTextStyle}>
                                <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2 break-all hover:underline"><Mail size={14} /> {data.personal.email}</a>
                                <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Phone size={14} /> {data.personal.phone}</a>
                                <p className="flex items-center gap-2"><MapPin size={14} /> {data.personal.location}</p>
                                {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 break-all hover:underline"><Globe size={14} /> {data.personal.website}</a>}
                            </div>
                        </section>
                        {skills.length > 0 && (
                            <section>
                                <SectionHeader title={t(language, 'skills')} icon={<Layers size={20} style={{ color }} />} color={color} textColor={textColor} />
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <span key={skill} className="text-sm font-bold py-1 px-2 border-2" style={{ borderColor: `${textColor}80`, color: textColor }}>
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
