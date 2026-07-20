
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, Globe, Award, Briefcase, GraduationCap, User, Wrench, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="mb-6">
        <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-current">
                {icon}
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="text-sm space-y-2">
            {children}
        </div>
    </div>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode, text: string | React.ReactNode }) => (
    <div className="flex items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-current">
            {icon}
        </div>
        <span className={themeStandards.typography.body}>{text}</span>
    </div>
);


export const AwesomeTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };
    const accentColorStyle = { color: color };
    const accentBgStyle = { backgroundColor: color };

    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full h-full relative overflow-hidden flex flex-col" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            {/* Header */}
            <header className="relative w-full h-48 flex-shrink-0">
                <div className="absolute top-2 right-4 w-44 h-44 rounded-full overflow-hidden shadow-md" style={accentBgStyle}>
                    {data.personal.photo && (
                        <Image
                            src={data.personal.photo}
                            alt={data.personal.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>
                <div className="absolute top-16 left-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-slate-900">{data.personal.name}</h1>
                    <div className="px-4 py-1 mt-2 inline-block rounded-md" style={accentBgStyle}>
                        <p className="text-sm font-semibold text-white uppercase tracking-wider">{data.personal.role}</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-12 pt-4 flex-grow grid grid-cols-2 gap-x-12 overflow-y-auto">
                <div style={accentColorStyle}>
                    {data.personal.description && (
                        <Section icon={<User size={24} className="text-white" />} title={t(language, 'profile')}>
                            <div className="whitespace-pre-line prose prose-sm max-w-none" style={{ color: textColor, opacity: 0.9 }}>{data.personal.description}</div>
                        </Section>
                    )}
                    {data.experience && data.experience.length > 0 && (
                        <Section icon={<Briefcase size={24} className="text-white" />} title={t(language, 'experience')}>
                            <div className="space-y-4">
                                {data.experience.map(exp => (
                                    <div key={exp.id}>
                                        <h3 className="font-bold text-md">{exp.role}</h3>
                                        <p className="text-sm font-semibold" style={accentColorStyle}>{exp.company} ({exp.date})</p>
                                        <div className="text-xs prose max-w-none" style={{ color: textColor, opacity: 0.8 }}>
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
                        </Section>
                    )}
                </div>
                <div style={accentColorStyle}>
                    {data.education && data.education.length > 0 && (
                        <Section icon={<GraduationCap size={24} className="text-white" />} title={t(language, 'education')}>
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-md">{edu.degree}</h3>
                                        <p className="text-sm font-semibold" style={accentColorStyle}>{edu.institution} ({edu.date})</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}
                    {data.skills && (
                        <Section icon={<Wrench size={24} className="text-white" />} title={t(language, 'skills')}>
                            <ul className="list-disc list-inside space-y-1 text-xs" style={{ color: textColor, opacity: 0.9 }}>
                                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </Section>
                    )}
                    {data.projects && data.projects.length > 0 && (
                        <Section icon={<Code size={24} className="text-white" />} title={t(language, 'projects')}>
                            <div className="space-y-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id}>
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-md hover:underline inline-block" style={accentColorStyle}>{proj.name}</a>
                                        {proj.link && (
                                            <div className="text-xs mt-1" style={{ color: textColor, opacity: 0.8 }}>
                                                Link: <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline break-all" style={accentColorStyle}>{proj.link}</a>
                                            </div>
                                        )}
                                        <div className="text-xs whitespace-pre-line prose max-w-none mt-1" style={{ color: textColor, opacity: 0.8 }}>{proj.description}</div>
                                        <p className="text-xs font-semibold" style={{ color: textColor, opacity: 0.9 }}>Technologies: {proj.technologies}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t mt-auto p-6 flex-shrink-0" style={{ ...accentColorStyle, color: textColor, borderColor: `${textColor}20` }}>
                <div className="grid grid-cols-3 gap-4">
                    <ContactItem icon={<Mail size={16} className="text-white" />} text={<a href={getMailtoLink(data.personal.email)} className="hover:underline">{data.personal.email}</a>} />
                    <ContactItem icon={<Phone size={16} className="text-white" />} text={<a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline">{data.personal.phone}</a>} />
                    {data.personal.website && (
                        <ContactItem icon={<Globe size={16} className="text-white" />} text={
                            <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="hover:underline break-all">{data.personal.website}</a>
                        } />
                    )}
                </div>
            </footer>
        </div>
    );
};
