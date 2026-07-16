
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, BookUser, Wrench, Code } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

const TimelineItem = ({ date, title, description, color, textColor }: { date: string, title: string, description: string, color: string, textColor: string }) => (
    <div className="flex gap-4 relative pb-6">
        <div className="absolute left-[7px] top-1 h-full w-px" style={{ backgroundColor: `${textColor}20` }}></div>
        <div className="flex-shrink-0 flex flex-col items-center z-10">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
        </div>
        <div className="w-full -mt-1">
            <p className="font-bold text-sm" style={{ color }}>{date}</p>
            <h3 className="font-bold text-lg" style={{ color: textColor }}>{title}</h3>
            <div className="text-sm whitespace-pre-line prose max-w-none" style={{ color: textColor, opacity: 0.8 }}>{description}</div>
        </div>
    </div>
);

const SidebarSection = ({ title, color, textColor, children, icon }: { title: string, color: string, textColor: string, children: React.ReactNode, icon: React.ReactNode }) => (
    <section>
        <div className="border-2 text-center py-2 flex items-center justify-center gap-2" style={{ borderColor: color, color: color }}>
            {icon}
            <h3 className="font-bold uppercase tracking-wider">{title}</h3>
        </div>
        <div className="mt-4 text-sm space-y-4" style={{ color: textColor }}>
            {children}
        </div>
    </section>
);


export const VektoristikTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font };

    const isSidebarColorLight = (hexColor: string) => {
        if (!hexColor.startsWith('#')) return false;
        const hex = hexColor.replace('#', '');
        if (hex.length !== 6 && hex.length !== 3) return false;
        let r, g, b;
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155;
    };

    const headerTextColor = isSidebarColorLight(color) ? '#000000' : '#FFFFFF';
    const sidebarTextColor = isSidebarColorLight(color) ? '#000000' : '#FFFFFF';
    const sidebarBorderColor = isSidebarColorLight(color) ? '#000000' : '#FFFFFF';


    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="flex h-full" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>

            {/* Main Content (Left) */}
            <main className="w-2/3 flex flex-col">
                {/* Header section with overlapping photo */}
                <div className="relative h-40">
                    {/* The colored bar */}
                    <div className="absolute top-0 left-0 right-0 h-28" style={{ backgroundColor: color }}>
                        <div className={`flex items-center h-full ${data.personal.photo ? 'pl-52' : 'pl-8'}`} style={{ color: headerTextColor }}>
                            <div>
                                <h1 className="text-4xl font-bold uppercase">{data.personal.name}</h1>
                                <p className="text-xl font-light tracking-wider">{data.personal.role}</p>
                            </div>
                        </div>
                    </div>
                    {/* The overlapping photo */}
                    {data.personal.photo && (
                        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-40 h-40 z-10">
                            <div className="relative w-full h-full rounded-full border-[6px]" style={{ borderColor: bgColor, backgroundColor: color }}>
                                <Image
                                    src={data.personal.photo}
                                    alt={data.personal.name}
                                    width={160}
                                    height={160}
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 pt-8 flex-grow overflow-y-auto">
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-wider p-2 text-center text-white mb-4" style={{ backgroundColor: color, color: headerTextColor }}>{t(language, 'education')}</h2>
                            <div className="space-y-0">
                                {data.education.map((edu) => (
                                    <TimelineItem
                                        key={edu.id}
                                        date={edu.date}
                                        title={edu.degree}
                                        description={edu.institution}
                                        color={color}
                                        textColor={textColor}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider p-2 text-center text-white mb-4" style={{ backgroundColor: color, color: headerTextColor }}>{t(language, 'experience')}</h2>
                            <div className="space-y-0">
                                {data.experience.map((exp) => (
                                    <TimelineItem
                                        key={exp.id}
                                        date={exp.date}
                                        title={exp.role}
                                        description={`${exp.company}\n${exp.description}`}
                                        color={color}
                                        textColor={textColor}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Sidebar (Right) */}
            <aside className="w-1/3 p-8 space-y-10 overflow-y-auto" style={{ backgroundColor: color, color: sidebarTextColor }}>
                <SidebarSection title={t(language, 'contact')} color={sidebarBorderColor} textColor={sidebarTextColor} icon={<Globe size={16} />}>
                    <div className="flex items-start gap-3">
                        <MapPin size={24} style={{ color: sidebarBorderColor }} className="flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold">{language === 'id' ? 'Alamat' : 'Address'}</h4>
                            <p className="opacity-80">{data.personal.location}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Mail size={24} style={{ color: sidebarBorderColor }} className="flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold">Web</h4>
                            <a href={getMailtoLink(data.personal.email)} className="opacity-80 break-all hover:underline">{data.personal.email}</a>
                            {data.personal.website && <a href={getWebsiteLink(data.personal.website)} className="opacity-80 hover:underline break-all block">{data.personal.website}</a>}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone size={24} style={{ color: sidebarBorderColor }} className="flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold">{language === 'id' ? 'Telepon' : 'Phone'}</h4>
                            <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="opacity-80 hover:underline">{data.personal.phone}</a>
                        </div>
                    </div>
                </SidebarSection>

                {skills.length > 0 && (
                    <SidebarSection title={t(language, 'skills')} color={sidebarBorderColor} textColor={sidebarTextColor} icon={<Wrench size={16} />}>
                        <div className="space-y-3">
                            {skills.map(skill => (
                                <p key={skill} className="text-sm font-semibold uppercase">{skill}</p>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {data.projects && data.projects.length > 0 && (
                    <SidebarSection title={t(language, 'projects')} color={sidebarBorderColor} textColor={sidebarTextColor} icon={<Code size={16} />}>
                        <div className="space-y-4">
                            {data.projects.map(proj => (
                                <div key={proj.id} className="text-sm">
                                    <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold hover:underline">{proj.name}</a>
                                    <p className="opacity-80 text-xs mt-1">{proj.description}</p>
                                    <p className="opacity-80 text-xs mt-1 font-semibold">{proj.technologies}</p>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}
            </aside>
        </div>
    );
};
