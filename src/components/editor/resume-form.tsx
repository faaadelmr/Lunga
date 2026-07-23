
"use client";

import { useResume } from "@/context/resume-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, Code, GraduationCap, MinusCircle, PlusCircle, User, Wrench, X } from "lucide-react";
import type { ChangeEvent } from "react";
import type { ResumeData } from "@/lib/types";
import Image from "next/image";
import { t } from "@/lib/translations";

export function ResumeForm() {
  const { resumeData, setResumeData, selectedLanguage } = useResume();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof Omit<ResumeData, 'experience' | 'education' | 'skills' | 'projects'>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [name]: value,
      }
    }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          // Crop and resize photo to standard 400x400 square canvas
          const canvas = document.createElement('canvas');
          canvas.width = 400;
          canvas.height = 400;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 400, 400);
            const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
            setResumeData(prev => ({
              ...prev,
              personal: {
                ...prev.personal,
                photo: resizedDataUrl,
              }
            }));
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
     setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        photo: "",
      }
    }));
  }
  
  const handleIndexedChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: 'experience' | 'education' | 'projects', index: number) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      const newSection = [...prev[section]];
      (newSection[index] as any)[name] = value;
      return { ...prev, [section]: newSection };
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: crypto.randomUUID(), company: "", role: "", date: "", description: "" }]
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };
  
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: crypto.randomUUID(), institution: "", degree: "", date: "", description: "" }]
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };
  
  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: crypto.randomUUID(), name: "", description: "", technologies: "", link: "" }]
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  return (
    <Accordion type="multiple" defaultValue={['personal', 'experience']} className="w-full space-y-4">
      <AccordionItem value="personal" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><User className="mr-2 text-primary" /> {t(selectedLanguage, 'personalDetails')}</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
           <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>{t(selectedLanguage, 'profilePhoto')}</Label>
              <span className="text-[11px] text-muted-foreground">Standard: 400×400 px (1:1)</span>
            </div>
            {resumeData.personal.photo ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-md group">
                  <Image src={resumeData.personal.photo} alt="Profile" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={removePhoto}
                      title={t(selectedLanguage, 'removePicture')}
                      className="p-1.5 bg-destructive text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="photo-change"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md cursor-pointer border transition-colors"
                  >
                    {t(selectedLanguage, 'changePicture')}
                  </Label>
                  <input
                    id="photo-change"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-3"
                    onClick={removePhoto}
                  >
                    {t(selectedLanguage, 'removePicture')}
                  </Button>
                </div>
              </div>
            ) : (
              <Input id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
            )}
           </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t(selectedLanguage, 'fullName')}</Label>
              <Input id="name" name="name" value={resumeData.personal.name} onChange={(e) => handleChange(e, 'personal')} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="role">{t(selectedLanguage, 'jobTitleRole')}</Label>
              <Input id="role" name="role" value={resumeData.personal.role} onChange={(e) => handleChange(e, 'personal')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t(selectedLanguage, 'emailAddress')}</Label>
              <Input id="email" name="email" type="email" value={resumeData.personal.email} onChange={(e) => handleChange(e, 'personal')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t(selectedLanguage, 'phoneNumber')}</Label>
              <Input id="phone" name="phone" value={resumeData.personal.phone} onChange={(e) => handleChange(e, 'personal')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t(selectedLanguage, 'locationCityCountry')}</Label>
              <Input id="location" name="location" value={resumeData.personal.location} onChange={(e) => handleChange(e, 'personal')} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="website">{t(selectedLanguage, 'websitePortfolio')}</Label>
              <Input id="website" name="website" value={resumeData.personal.website} onChange={(e) => handleChange(e, 'personal')} />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="description">{t(selectedLanguage, 'professionalSummary')}</Label>
              <Textarea id="description" name="description" value={resumeData.personal.description} onChange={(e) => handleChange(e, 'personal')} rows={3}/>
            </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><Briefcase className="mr-2 text-primary" /> {t(selectedLanguage, 'workExperience')}</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-md relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t(selectedLanguage, 'company')}</Label>
                  <Input name="company" value={exp.company} onChange={(e) => handleIndexedChange(e, 'experience', index)} />
                </div>
                <div className="space-y-2">
                  <Label>{t(selectedLanguage, 'jobRole')}</Label>
                  <Input name="role" value={exp.role} onChange={(e) => handleIndexedChange(e, 'experience', index)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'datePeriod')}</Label>
                <Input name="date" value={exp.date} onChange={(e) => handleIndexedChange(e, 'experience', index)} />
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'description')}</Label>
                <Textarea name="description" value={exp.description} onChange={(e) => handleIndexedChange(e, 'experience', index)} rows={4} />
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeExperience(exp.id)}><MinusCircle /></Button>
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full"><PlusCircle className="mr-2"/> {t(selectedLanguage, 'addExperience')}</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><GraduationCap className="mr-2 text-primary" /> {t(selectedLanguage, 'education')}</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
           {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-md relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t(selectedLanguage, 'institution')}</Label>
                  <Input name="institution" value={edu.institution} onChange={(e) => handleIndexedChange(e, 'education', index)} />
                </div>
                <div className="space-y-2">
                  <Label>{t(selectedLanguage, 'degreeField')}</Label>
                  <Input name="degree" value={edu.degree} onChange={(e) => handleIndexedChange(e, 'education', index)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'datePeriod')}</Label>
                <Input name="date" value={edu.date} onChange={(e) => handleIndexedChange(e, 'education', index)} />
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'description')}</Label>
                <Textarea name="description" value={edu.description} onChange={(e) => handleIndexedChange(e, 'education', index)} rows={2}/>
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEducation(edu.id)}><MinusCircle /></Button>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full"><PlusCircle className="mr-2" /> {t(selectedLanguage, 'addEducation')}</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><Code className="mr-2 text-primary" /> {t(selectedLanguage, 'projectsSection')}</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
          {resumeData.projects.map((proj, index) => (
            <div key={proj.id} className="p-4 border rounded-md relative space-y-4">
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'projectName')}</Label>
                <Input name="name" value={proj.name} onChange={(e) => handleIndexedChange(e, 'projects', index)} />
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'description')}</Label>
                <Textarea name="description" value={proj.description} onChange={(e) => handleIndexedChange(e, 'projects', index)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'technologiesUsed')}</Label>
                <Input name="technologies" value={proj.technologies} onChange={(e) => handleIndexedChange(e, 'projects', index)} />
              </div>
              <div className="space-y-2">
                <Label>{t(selectedLanguage, 'projectUrl')}</Label>
                <Input name="link" value={proj.link} onChange={(e) => handleIndexedChange(e, 'projects', index)} />
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeProject(proj.id)}><MinusCircle /></Button>
            </div>
          ))}
          <Button onClick={addProject} variant="outline" className="w-full"><PlusCircle className="mr-2"/> {t(selectedLanguage, 'addProject')}</Button>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="skills" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><Wrench className="mr-2 text-primary" /> {t(selectedLanguage, 'skillsSection')}</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-2">
          <Label htmlFor="skills">{t(selectedLanguage, 'skillsCommaSeparated')}</Label>
          <Textarea id="skills" name="skills" value={resumeData.skills} onChange={(e) => setResumeData({...resumeData, skills: e.target.value})} rows={4}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
