
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Calculator, PenLine, FileText, Briefcase, GraduationCap, User, Star, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink } from '@/lib/contact-links';

const SectionHeader = ({ title, color, textColor, icon }: { title: string, color: string, textColor: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>
        {icon}
        <h2 className="text-lg font-bold uppercase tracking-wider">{title}</h2>
    </div>
);

export const LedgerTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const lightTextStyle = { color: textColor, opacity: 0.8 };
    const tableHeaderStyle = { backgroundColor: `${color}1A`, borderBottom: `2px solid ${color}` };

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>

            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                {data.personal.photo && (
                    <div className="w-24 h-24 relative overflow-hidden shadow-md flex-shrink-0 border-2" style={{ borderColor: color }}>
                        <Image
                            src={data.personal.photo}
                            alt={data.personal.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="text-right flex-grow pl-6">
                    <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color }}>{data.personal.name}</h1>
                    <p className="text-lg font-semibold">{data.personal.role}</p>
                    <div className="mt-1 text-xs" style={lightTextStyle}>
                        <a href={getMailtoLink(data.personal.email)} className="hover:underline">{data.personal.email}</a> | <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline">{data.personal.phone}</a> | {data.personal.location}
                    </div>
                </div>
            </header>

            {/* Document Title */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-[0.2em] inline-block px-4 py-1 border-y-2" style={{ borderColor: textColor }}>Curriculum Vitae</h2>
            </div>

            {/* Main Content Grid */}
            <main className="grid grid-cols-12 gap-x-8 flex-grow">

                {/* Left Column: Assets */}
                <aside className="col-span-5 space-y-6">
                    {data.personal.description && (
                        <section>
                            <SectionHeader title={t(language, 'profile')} icon={<User size={18} style={{ color }} />} color={color} textColor={textColor} />
                            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
                        </section>
                    )}
                    {data.skills && (
                        <section>
                            <SectionHeader title={t(language, 'skills')} icon={<Calculator size={18} style={{ color }} />} color={color} textColor={textColor} />
                            <ul className="text-sm space-y-1" style={lightTextStyle}>
                                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                    <li key={skill} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-current rounded-full" style={{ backgroundColor: color }}></div>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Vertical Separator */}
                <div className="col-span-1 flex justify-center">
                    <div className="w-px h-full" style={{ backgroundColor: `${textColor}30` }}></div>
                </div>

                {/* Right Column: Transactions */}
                <main className="col-span-6 space-y-6">
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'workHistory')} icon={<Briefcase size={18} style={{ color }} />} color={color} textColor={textColor} />
                            <div className="space-y-4">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="text-sm">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-md">{exp.role}</h3>
                                            <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-1" style={{ color }}>{exp.company}</h4>
                                        <div className="prose max-w-none text-xs" style={lightTextStyle}>
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
                            <SectionHeader title={t(language, 'education')} icon={<GraduationCap size={18} style={{ color }} />} color={color} textColor={textColor} />
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="text-sm">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-md">{edu.degree}</h3>
                                            <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-1" style={{ color }}>{edu.institution}</h4>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'projects')} icon={<Code size={18} style={{ color }} />} color={color} textColor={textColor} />
                            <div className="space-y-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="text-sm">
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-md hover:underline" style={{ color }}>{proj.name}</a>
                                        <div className="whitespace-pre-line prose max-w-none text-xs mt-1" style={lightTextStyle}>{proj.description}</div>
                                        <p className="text-xs font-semibold mt-1" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </main>
        </div>
    );
};
