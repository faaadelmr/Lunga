
"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { GitCommit, GitBranch } from 'lucide-react';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';
import { themeStandards } from '@/lib/theme-standards';

const Section = ({ title, children, color }: { title: string, children: React.ReactNode, color: string }) => (
    <section className={themeStandards.spacing.sectionMargin}>
        <div className="flex items-center gap-2 mb-2">
            <GitCommit size={14} style={{ color }} />
            <h2 className={themeStandards.typography.sectionTitle}># {title}</h2>
        </div>
        <div className="pl-5 border-l border-dashed border-gray-400/30">
            {children}
        </div>
    </section>
);

const CommandLine = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-2 text-xs">
        <span style={{ color: 'hsl(210, 100%, 70%)' }}>$</span>
        <span>{children}</span>
    </div>
)

export const GitFolioTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
    const fontStyle = { fontFamily: font || 'monospace' };
    return (
        <div className={`${themeStandards.spacing.containerClass} ${themeStandards.spacing.containerPadding}`} style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            {/* Header */}
            <header className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h1 className={themeStandards.typography.name} style={{ color }}>{data.personal.name}</h1>
                    <div className="flex items-center gap-2 text-xs" style={{ color }}>
                        <GitBranch size={14} />
                        <span>main</span>
                    </div>
                </div>
                <div className="space-y-1 text-xs">
                    <CommandLine>git config user.role "{data.personal.role}"</CommandLine>
                    <CommandLine>git config user.email "<a href={getMailtoLink(data.personal.email)} className="hover:underline" style={{ color }}>{data.personal.email}</a>"</CommandLine>
                    <CommandLine>git config user.phone "<a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="hover:underline" style={{ color }}>{data.personal.phone}</a>"</CommandLine>
                    <CommandLine>git config user.location "{data.personal.location}"</CommandLine>
                    {data.personal.website && <CommandLine>git config user.website <a href={getWebsiteLink(data.personal.website)} style={{ color }} className="hover:underline" target="_blank" rel="noopener noreferrer">{data.personal.website}</a></CommandLine>}
                </div>
            </header>

            {/* Profile / Summary */}
            {data.personal.description && (
                <Section title={language === 'id' ? 'ringkasan' : 'summary'} color={color}>
                    <p className={themeStandards.typography.body}>{data.personal.description}</p>
                </Section>
            )}

            {/* Skills */}
            {data.skills && (
                <Section title={language === 'id' ? 'keahlian' : 'skills'} color={color}>
                    <div className="flex flex-wrap gap-1.5">
                        {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                            <span key={skill} className={themeStandards.components.badge} style={{ backgroundColor: `${textColor}1A`, color: textColor }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <Section title={language === 'id' ? 'pengalaman' : 'experience'} color={color}>
                    {data.experience.map(exp => (
                        <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className={themeStandards.typography.subTitle} style={{ color }}>{exp.role} @ {exp.company}</h3>
                                <p className={themeStandards.typography.meta}>{exp.date}</p>
                            </div>
                            <div className={themeStandards.typography.body + " mt-0.5 space-y-1"}>
                                {exp.description.split('\n')
                                    .map(line => line.trim())
                                    .filter(line => line.length > 0)
                                    .map((line, i) => (
                                        <div key={i} className="flex items-start gap-1.5">
                                            <span className="flex-shrink-0 select-none">•</span>
                                            <span className="flex-grow w-0">{line.replace(/^[-*•]\s*/, '')}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <Section title={language === 'id' ? 'proyek' : 'projects'} color={color}>
                    {data.projects.map(proj => (
                        <div key={proj.id} className="mb-3">
                            <div>
                                <h3 className={themeStandards.typography.subTitle} style={{ color }}>{proj.name}</h3>
                                {proj.link && (
                                    <div className="text-[10px] mt-0.5">
                                        <span className="font-bold">remote.origin.url:</span> <a href={getWebsiteLink(proj.link)} target="_blank" rel="noreferrer" className="hover:underline break-all" style={{ color }}>{proj.link}</a>
                                    </div>
                                )}
                            </div>
                            <p className="font-semibold italic text-[10px]">feat: {proj.technologies}</p>
                            {proj.description && <div className={themeStandards.typography.body + " mt-0.5"}>{proj.description}</div>}
                        </div>
                    ))}
                </Section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <Section title={language === 'id' ? 'pendidikan' : 'education'} color={color}>
                    {data.education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className={themeStandards.typography.subTitle} style={{ color }}>{edu.institution}</h3>
                                <p className={themeStandards.typography.meta}>{edu.date}</p>
                            </div>
                            <p className="font-semibold italic text-xs">{edu.degree}</p>
                            {edu.description && <p className={themeStandards.typography.body + " mt-0.5"}>{edu.description}</p>}
                        </div>
                    ))}
                </Section>
            )}
        </div>
    );
};
