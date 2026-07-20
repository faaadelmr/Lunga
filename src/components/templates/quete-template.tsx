
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, User, Wrench, Facebook, Twitter, Instagram, Linkedin, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const WavyBackground = ({ color, position }: { color: string, position: 'top' | 'bottom' }) => (
    <div className={`absolute left-0 right-0 w-full h-48 ${position === 'top' ? 'top-0' : 'bottom-0'}`} style={{ color }}>
        <svg
            className={`w-full h-full ${position === 'bottom' ? 'transform rotate-180' : ''}`}
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
        >
            <path
                fill="currentColor"
                fillOpacity="0.8"
                d="M0,224L80,208C160,192,320,160,480,170.7C640,181,800,235,960,240C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
            <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,154.7C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
        </svg>
    </div>
);

const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
        </div>
        <h2 className="text-lg font-bold uppercase" style={{ color }}>{title}</h2>
    </div>
);

// Helper function to determine if a color is light or dark
const isColorLight = (hexColor: string) => {
    if (!hexColor.startsWith('#')) return false;
    const hex = hexColor.replace('#', '');
    if (hex.length !== 6) return false;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};

export const QueteTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const textStyle = { color: textColor };
    const lightTextStyle = { color: textColor, opacity: 0.8 };

    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    const headerTextColor = isColorLight(color) ? '#1E293B' : '#FFFFFF';

    return (
        <div className="relative w-full h-full p-8 overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor }}>
            <WavyBackground color={color} position="top" />
            <WavyBackground color={color} position="bottom" />

            <main className="relative z-10 w-full h-full flex flex-col pt-[72px] overflow-y-auto">
                {/* Header */}
                <header className="flex items-center w-full mb-10 pl-8">
                    {data.personal.photo && (
                        <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-lg flex-shrink-0 mr-8 border-4 border-white bg-white">
                            <Image
                                src={data.personal.photo}
                                alt={data.personal.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-grow z-10">
                        <h1 className="font-bold uppercase tracking-wider text-4xl" style={{ color: textColor }}>{data.personal.name}</h1>
                        <p className="font-light tracking-[0.2em] text-sm mt-1" style={{ color: color }}>{data.personal.role}</p>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-x-10 flex-grow px-8">
                    {/* Left Column (Info Sidebar) */}
                    <div className="col-span-4 space-y-6">
                        <section>
                            <SectionHeader icon={<MapPin size={14} />} title={t(language, 'contact')} color={color} />
                            <div className="text-xs space-y-2 pl-3" style={lightTextStyle}>
                                {data.personal.phone && <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="block hover:underline">{data.personal.phone}</a>}
                                {data.personal.email && <a href={getMailtoLink(data.personal.email)} className="block hover:underline">{data.personal.email}</a>}
                                {data.personal.website && <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="block hover:underline truncate">{data.personal.website}</a>}
                                {data.personal.location && <p>{data.personal.location}</p>}
                            </div>
                        </section>

                        {data.personal.description && (
                            <section>
                                <SectionHeader icon={<User size={14} />} title={t(language, 'profile')} color={color} />
                                <p className="text-xs whitespace-pre-line pl-3 leading-relaxed" style={lightTextStyle}>{data.personal.description}</p>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section>
                                <SectionHeader icon={<Wrench size={14} />} title={t(language, 'skills')} color={color} />
                                <div className="flex flex-wrap gap-1.5 pl-3">
                                    {skills.map(skill => (
                                        <span key={skill} className="text-[10px] py-1 px-2.5 rounded-md border" style={{ borderColor: `${color}30`, backgroundColor: `${color}08`, color: textColor }}>{skill}</span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Main Details) */}
                    <div className="col-span-8 space-y-6">
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <SectionHeader icon={<Briefcase size={14} />} title={t(language, 'workHistory')} color={color} />
                                <div className="space-y-4 pl-3">
                                    {data.experience.map(exp => (
                                        <div key={exp.id} className="border-l-2 pl-4 ml-1" style={{ borderColor: `${color}30` }}>
                                            <h3 className="font-bold text-sm" style={textStyle}>{exp.role}</h3>
                                            <div className="flex justify-between text-xs font-semibold mb-1" style={{ color: color }}>
                                                <span>{exp.company}</span>
                                                <span className="font-mono text-gray-500">{exp.date}</span>
                                            </div>
                                            <div className="text-xs prose max-w-none leading-relaxed" style={lightTextStyle}>
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
                                <SectionHeader icon={<GraduationCap size={14} />} title={t(language, 'education')} color={color} />
                                <div className="space-y-4 pl-3">
                                    {data.education.map(edu => (
                                        <div key={edu.id} className="border-l-2 pl-4 ml-1" style={{ borderColor: `${color}30` }}>
                                            <h3 className="font-bold text-sm" style={textStyle}>{edu.degree}</h3>
                                            <div className="flex justify-between text-xs font-semibold mb-1" style={{ color: color }}>
                                                <span>{edu.institution}</span>
                                                <span className="font-mono text-gray-500">{edu.date}</span>
                                            </div>
                                            {edu.description && <p className="text-xs leading-relaxed" style={lightTextStyle}>{edu.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <SectionHeader icon={<Code size={14} />} title={t(language, 'projects')} color={color} />
                                <div className="space-y-4 pl-3">
                                    {data.projects.map(proj => (
                                        <div key={proj.id} className="border-l-2 pl-4 ml-1" style={{ borderColor: `${color}30` }}>
                                            <h3 className="font-bold text-sm" style={{ color }}>{proj.name}</h3>
                                            {proj.link && (
                                                <div className="text-xs mb-1" style={lightTextStyle}>
                                                    Link: <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline break-all" style={{ color: color }}>{proj.link}</a>
                                                </div>
                                            )}
                                            <p className="text-xs whitespace-pre-line leading-relaxed" style={lightTextStyle}>{proj.description}</p>
                                            <p className="text-xs font-semibold mt-1" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
