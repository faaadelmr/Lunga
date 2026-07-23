import React from "react";
import { useResume } from "@/context/resume-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/translations";

export function ResignForm() {
  const { resignData, setResignData, selectedLanguage } = useResume();

  const handleInputChange = (field: keyof typeof resignData, value: string) => {
    setResignData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePresetReason = (reason: string) => {
    handleInputChange("reasonOption", reason);
  };

  const generateAiMessage = (presetType: 'formal' | 'warm' | 'direct') => {
    let msg = "";
    if (selectedLanguage === 'en') {
      if (presetType === 'formal') {
        msg = "I express my sincere gratitude for the guidance, encouragement, and incredible opportunities provided to me during my time with the company. I wish the organization continued growth and success in the future.";
      } else if (presetType === 'warm') {
        msg = "Thank you so much for the invaluable experience, knowledge, and warmth shared by the management and my colleagues. Working with this team has been one of the highlights of my career.";
      } else {
        msg = "I greatly appreciate the valuable opportunities provided during my tenure. I am fully committed to completing my remaining duties and ensuring a seamless handover process.";
      }
    } else {
      if (presetType === 'formal') {
        msg = "Saya mengucapkan terima kasih yang sebesar-besarnya atas bimbingan, dorongan, dan kesempatan luar biasa yang telah diberikan kepada saya selama bekerja di perusahaan ini. Saya mendoakan agar perusahaan senantiasa sukses dan berkembang pesat di masa depan.";
      } else if (presetType === 'warm') {
        msg = "Terima kasih banyak atas segala pengalaman, ilmu, dan kehangatan dari seluruh jajaran manajemen dan rekan kerja sekalian. Pengalaman bekerja bersama tim ini merupakan salah satu momen terbaik dalam perjalanan karir saya.";
      } else {
        msg = "Saya sangat mengapresiasi kesempatan berharga yang telah diberikan selama saya bertugas. Saya berkomitmen penuh untuk menyelesaikan tanggung jawab yang tersisa dan memastikan proses serah terima pekerjaan (handover) berjalan lancar.";
      }
    }
    handleInputChange("customMessage", msg);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Banner Disclaimer (White Background with Shimmering Glowing Border) */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-red-500 via-amber-400 to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] overflow-hidden">
        <div className="bg-white text-neutral-900 rounded-[14px] p-5 md:p-6 shadow-inner">
          <div className="text-xs leading-relaxed space-y-2">
            <p className="font-extrabold text-xs md:text-sm text-blue-700 tracking-wide">
              {t(selectedLanguage, 'resignBannerTitle')}
            </p>
            <p className="text-neutral-700 font-medium leading-relaxed">
              {t(selectedLanguage, 'resignBannerDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Identitas Karyawan */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-red-900/60 pb-2">
          {t(selectedLanguage, 'senderInfo')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'fullName')}</Label>
            <Input
              value={resignData.senderName}
              onChange={(e) => handleInputChange("senderName", e.target.value)}
              placeholder={selectedLanguage === 'en' ? "e.g. Alex Johnson" : "Contoh: Alex Pratama"}
              className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'jobTitleRole')}</Label>
            <Input
              value={resignData.senderRole}
              onChange={(e) => handleInputChange("senderRole", e.target.value)}
              placeholder={selectedLanguage === 'en' ? "e.g. Software Engineer" : "Contoh: Software Engineer"}
              className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Perusahaan & Atasan */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-red-900/60 pb-2">
          {t(selectedLanguage, 'recipientInfo')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'recipientName')}</Label>
            <Input
              value={resignData.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
              placeholder={selectedLanguage === 'en' ? "Manager / HRD Name" : "Bapak / Ibu Manager HRD"}
              className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'companyName')}</Label>
            <Input
              value={resignData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder={selectedLanguage === 'en' ? "e.g. Acme Corporation" : "Contoh: PT Nusantaramu Tech"}
              className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Tanggal & Alasan Resign */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-red-900/60 pb-2">
          {t(selectedLanguage, 'resignDatesAndReason')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'letterCity')}</Label>
            <Input
              value={resignData.letterCity}
              onChange={(e) => handleInputChange("letterCity", e.target.value)}
              placeholder={selectedLanguage === 'en' ? "e.g. New York" : "Contoh: Jakarta"}
              className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'letterDate')}</Label>
            <Input
              type="date"
              value={resignData.letterDate}
              onChange={(e) => handleInputChange("letterDate", e.target.value)}
              className="bg-white text-neutral-900 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'lastWorkingDay')}</Label>
            <Input
              type="date"
              value={resignData.lastWorkingDay}
              onChange={(e) => handleInputChange("lastWorkingDay", e.target.value)}
              className="bg-white text-neutral-900 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-red-100">{t(selectedLanguage, 'reasonLabel')}</Label>
          <Select value={resignData.reasonOption} onValueChange={handlePresetReason}>
            <SelectTrigger className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm">
              <SelectValue placeholder={t(selectedLanguage, 'reasonPlaceholder')} />
            </SelectTrigger>
            <SelectContent className="bg-white text-neutral-900 border-neutral-200">
              <SelectItem value={selectedLanguage === 'en' ? "pursue new career opportunities and professional challenges" : "Melanjutkan jenjang karir baru dan tantangan profesional baru"}>{selectedLanguage === 'en' ? "New Career Opportunities" : "Karir Baru & Tantangan Baru"}</SelectItem>
              <SelectItem value={selectedLanguage === 'en' ? "further my higher education and academic studies" : "Melanjutkan pendidikan / studi ke jenjang lebih tinggi"}>{selectedLanguage === 'en' ? "Further Studies / Education" : "Melanjutkan Pendidikan / Studi"}</SelectItem>
              <SelectItem value={selectedLanguage === 'en' ? "attend to personal and family commitments" : "Alasan pribadi dan keluarga yang membutuhkan perhatian lebih"}>{selectedLanguage === 'en' ? "Personal & Family Commitments" : "Alasan Pribadi / Keluarga"}</SelectItem>
              <SelectItem value={selectedLanguage === 'en' ? "focus on health and personal recovery" : "Kondisi kesehatan dan rest & recovery"}>{selectedLanguage === 'en' ? "Health & Recovery" : "Kesehatan & Recovery"}</SelectItem>
              <SelectItem value={selectedLanguage === 'en' ? "pursue entrepreneurial endeavors and freelancing" : "Mendirikan usaha mandiri / freelancing"}>{selectedLanguage === 'en' ? "Entrepreneurship / Freelancing" : "Wirausaha / Freelance"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-red-100">{t(selectedLanguage, 'closingMessageLabel')}</Label>
            <div className="flex items-center gap-1.5">
              <Button type="button" size="sm" onClick={() => generateAiMessage('formal')} className="h-6 text-[10px] px-2.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold border border-neutral-300 shadow-sm">
                Formal
              </Button>
              <Button type="button" size="sm" onClick={() => generateAiMessage('warm')} className="h-6 text-[10px] px-2.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold border border-neutral-300 shadow-sm">
                {selectedLanguage === 'en' ? 'Warm' : 'Hangat'}
              </Button>
              <Button type="button" size="sm" onClick={() => generateAiMessage('direct')} className="h-6 text-[10px] px-2.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold border border-neutral-300 shadow-sm">
                Handover
              </Button>
            </div>
          </div>
          <Textarea
            rows={4}
            value={resignData.customMessage}
            onChange={(e) => handleInputChange("customMessage", e.target.value)}
            placeholder={t(selectedLanguage, 'closingMessagePlaceholder')}
            className="bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-300 font-medium focus-visible:ring-red-600 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
