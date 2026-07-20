
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, HardHat, Wrench, Briefcase, GraduationCap, User, Ruler, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const SectionHeader = ({ title, color, textColor, icon }: { title: string, color: string, textColor: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-sm" style={{ backgroundColor: color }}>
            {icon}
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider" style={{ color: textColor }}>{title}</h2>
    </div>
);

const CautionTapePattern = ({ color }: { color: string }) => (
    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
            <pattern
                id="caution-stripes"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
            >
                <rect width="20" height="40" fill={color} fillOpacity="0.2"></rect>
                <rect x="20" width="20" height="40" fill="transparent"></rect>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#caution-stripes)"></rect>
    </svg>
);


export const ConstructTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const lightTextStyle = { color: textColor, opacity: 0.8 };

    return (
        <div className="relative h-full overflow-hidden p-8" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            {/* Header with Caution Tape effect */}
            <header className="relative flex items-center justify-between gap-6 mb-8 p-4 z-10" style={{ border: `3px solid ${color} ` }}>
                <CautionTapePattern color={color} />
                <div className='relative flex-grow w-0'>
                    <h1 className="text-4xl font-bold uppercase" style={{ color: color }}>{data.personal.name}</h1>
                    <p className="text-lg font-semibold">{data.personal.role}</p>
                </div>
                {data.personal.photo && (
                    <div className="w-24 h-24 relative rounded-md overflow-hidden shadow-lg border-2 flex-shrink-0" style={{ borderColor: color }}>
                        <Image
                            src={data.personal.photo}
                            alt={data.personal.name}
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                )}
            </header>

            <main className="grid grid-cols-3 gap-8 relative z-10">
                {/* Left Column */}
                <aside className="col-span-1 space-y-8">
                    <section>
                        <h3 className="font-bold text-lg uppercase flex items-center gap-2 mb-3" style={{ color }}><HardHat size={20} /> {t(language, 'contact')}</h3>
                        <div className="text-sm space-y-2" style={lightTextStyle}>
                            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Phone size={14} /> {data.personal.phone}</a>
                            <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-2 break-all hover:underline"><Mail size={14} /> {data.personal.email}</a>
                            <p className="flex items-center gap-2"><MapPin size={14} /> {data.personal.location}</p>
                            {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Globe size={14} /> {data.personal.website}</a>}
                        </div>
                    </section>
                    {data.skills && (
                        <section>
                            <h3 className="font-bold text-lg uppercase flex items-center gap-2 mb-3" style={{ color }}><Wrench size={20} /> {t(language, 'skills')}</h3>
                            <ul className="text-sm list-disc list-inside space-y-1" style={lightTextStyle}>
                                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Right Column */}
                <main className="col-span-2 space-y-8">
                    {data.personal.description && (
                        <section>
                            <SectionHeader title={t(language, 'profile')} icon={<User size={16} color={bgColor} />} color={color} textColor={textColor} />
                            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
                        </section>
                    )}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'experience')} icon={<Briefcase size={16} color={bgColor} />} color={color} textColor={textColor} />
                            <div className="space-y-5">
                                {data.experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline gap-4">
                                            <div className="flex-grow w-0">
                                                <h3 className="font-bold text-md">{exp.role}</h3>
                                                <h4 className="font-semibold text-sm" style={{ color: color }}>{exp.company}</h4>
                                            </div>
                                            <p className="text-xs font-mono flex-shrink-0 text-right" style={lightTextStyle}>{exp.date}</p>
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
                            <SectionHeader title={t(language, 'education')} icon={<GraduationCap size={16} color={bgColor} />} color={color} textColor={textColor} />
                            <div className="space-y-5">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-baseline gap-4">
                                            <div className="flex-grow w-0">
                                                <h3 className="font-bold text-md">{edu.degree}</h3>
                                                <h4 className="font-semibold text-sm" style={{ color: color }}>{edu.institution}</h4>
                                            </div>
                                            <p className="text-xs font-mono flex-shrink-0 text-right" style={lightTextStyle}>{edu.date}</p>
                                        </div>
                                        <p className="text-sm whitespace-pre-line mt-1" style={lightTextStyle}>{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <SectionHeader title={t(language, 'projects')} icon={<Code size={16} color={bgColor} />} color={color} textColor={textColor} />
                            <div className="space-y-5">
                                {data.projects.map(proj => (
                                    <div key={proj.id}>
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-md hover:underline" style={{ color }}>{proj.name}</a>
                                        <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={lightTextStyle}>{proj.description}</div>
                                        <p className="text-sm font-semibold mt-1" style={lightTextStyle}>Technologies: {proj.technologies}</p>
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
