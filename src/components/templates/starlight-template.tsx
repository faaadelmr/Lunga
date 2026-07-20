
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Star, Sparkles, User, Briefcase, GraduationCap, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const StarlightPattern = ({ color }: { color: string }) => (
    <div className="absolute inset-0 w-full h-full opacity-30" style={{ color }}>
        <svg width="100%" height="100%">
            <defs>
                <pattern id="star-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
                    <path d="M25 0 L30.9 19.1 H50 L34.5 30.9 L40.5 50 L25 38.2 L9.5 50 L15.5 30.9 L0 19.1 H19.1 Z" fill="currentColor" transform="scale(0.3) translate(30, 30)" opacity="0.5" />
                    <path d="M5 5 L6.9 10.9 H12.8 L8.4 14.5 L10.3 20.4 L5 16.8 L-0.3 20.4 L1.6 14.5 L-2.8 10.9 H3.1 Z" fill="currentColor" transform="scale(0.2) translate(150, 150)" opacity="0.8" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#star-pattern)" />
        </svg>
    </div>
);


const Section = ({ icon, title, children, color, textColor }: { icon: React.ReactNode, title: string, children: React.ReactNode, color: string, textColor: string }) => (
    <section className="mb-8">
        <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${color}20` }}>
                {icon}
            </div>
            <h2 className="text-xl font-bold tracking-wider" style={{ color: textColor }}>{title}</h2>
        </div>
        <div className="pl-12">
            {children}
        </div>
    </section>
);


export const StarlightTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const lightTextStyle = { color: textColor, opacity: 0.8 };

    return (
        <div className="w-full h-full p-8" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            <div className="grid grid-cols-12 gap-x-10 h-full">
                {/* Left Column */}
                <aside className="col-span-4 flex flex-col items-center text-center pt-8 overflow-y-auto">
                    {data.personal.photo && (
                        <div className="relative w-40 h-40 mb-5">
                            <Image
                                src={data.personal.photo}
                                alt={data.personal.name}
                                width={160}
                                height={160}
                                className="object-cover rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    )}
                    <h1 className="text-3xl font-bold" style={{ color: color }}>{data.personal.name}</h1>
                    <p className="text-lg mt-1" style={lightTextStyle}>{data.personal.role}</p>

                    <div className="w-full h-px my-8" style={{ backgroundColor: `${textColor}20` }}></div>

                    <div className="text-left w-full space-y-6 text-sm">
                        <div>
                            <h3 className="font-bold text-md uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: color }}><Sparkles size={16} /> {t(language, 'contact')}</h3>
                            <div className="space-y-2" style={lightTextStyle}>
                                <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-3 hover:underline"><Mail size={14} /> {data.personal.email}</a>
                                <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><Phone size={14} /> {data.personal.phone}</a>
                                <p className="flex items-center gap-3"><MapPin size={14} /> {data.personal.location}</p>
                                {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><Globe size={14} /> {data.personal.website}</a>}
                            </div>
                        </div>
                        {data.skills && (
                            <div>
                                <h3 className="font-bold text-md uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: color }}><Star size={16} /> {t(language, 'skills')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                        <span key={skill} className="text-xs py-1 px-3 rounded-full" style={{ backgroundColor: `${color}20`, color: color }}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Right Column */}
                <main className="col-span-8 p-8 rounded-2xl relative overflow-hidden" style={{ backgroundColor: `${color}10` }}>
                    <StarlightPattern color={color} />
                    <div className="relative z-10">
                        {data.personal.description && (
                            <Section icon={<User size={20} style={{ color }} />} title={t(language, 'profile')} color={color} textColor={textColor}>
                                <p className="whitespace-pre-line text-sm" style={lightTextStyle}>{data.personal.description}</p>
                            </Section>
                        )}
                        {data.experience && data.experience.length > 0 && (
                            <Section icon={<Briefcase size={20} style={{ color }} />} title={t(language, 'experience')} color={color} textColor={textColor}>
                                <div className="space-y-5">
                                    {data.experience.map(exp => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold text-lg">{exp.role}</h3>
                                                <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                                            </div>
                                            <h4 className="font-semibold mb-1" style={{ color: color }}>{exp.company}</h4>
                                            <div className="text-sm prose max-w-none" style={lightTextStyle}>
                                                {exp.description.split('\n').map((line, i) => (
                                                    <div key={i}>{line}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}
                        {data.education && data.education.length > 0 && (
                            <Section icon={<GraduationCap size={20} style={{ color }} />} title={t(language, 'education')} color={color} textColor={textColor}>
                                <div className="space-y-5">
                                    {data.education.map(edu => (
                                        <div key={edu.id}>
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold text-lg">{edu.degree}</h3>
                                                <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                                            </div>
                                            <h4 className="font-semibold" style={{ color: color }}>{edu.institution}</h4>
                                            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}
                        {data.projects && data.projects.length > 0 && (
                            <Section icon={<Code size={20} style={{ color }} />} title={t(language, 'projects')} color={color} textColor={textColor}>
                                <div className="space-y-5">
                                    {data.projects.map(proj => (
                                        <div key={proj.id}>
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-lg hover:underline" style={{ color }}>{proj.name}</a>
                                            <div className="text-sm whitespace-pre-line prose max-w-none my-1" style={lightTextStyle}>{proj.description}</div>
                                            <p className="text-sm font-semibold" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
