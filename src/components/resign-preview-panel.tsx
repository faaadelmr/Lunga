import React, { useRef, useState } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";
import Footer from "./footer";
import { t } from "@/lib/translations";

export function ResignPreviewPanel() {
  const { resignData, selectedLanguage } = useResume();
  const [downloading, setDownloading] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const isEn = selectedLanguage === 'en';

  // Helper to format ISO date (YYYY-MM-DD) to friendly localized string
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        if (!isNaN(dateObj.getTime())) {
          return dateObj.toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }
    }
    return dateStr;
  };

  const formattedLetterDate = formatDate(resignData.letterDate);
  const formattedLastWorkingDay = formatDate(resignData.lastWorkingDay);

  const defaultSenderName = resignData.senderName || (isEn ? "[Your Full Name]" : "[Nama Anda]");
  const defaultSenderRole = resignData.senderRole || (isEn ? "[Your Job Title]" : "[Jabatan Anda]");
  const defaultRecipientName = resignData.recipientName || (isEn ? "[Manager / HRD Name]" : "[Nama Atasan / HRD]");
  const defaultRecipientRole = resignData.recipientRole || (isEn ? "HRD / Management" : "HRD / Manajemen");
  const defaultCompanyName = resignData.companyName || (isEn ? "[Company Name]" : "[Nama Perusahaan]");

  const defaultLocationDate = (resignData.letterCity || resignData.letterDate)
    ? `${resignData.letterCity || (isEn ? '[City]' : '[Kota]')}${resignData.letterCity && formattedLetterDate ? ', ' : ''}${formattedLetterDate}`
    : (resignData.locationDate || (isEn ? "[City, Date]" : "[Kota, Tanggal Surat]"));

  const defaultLastWorkingDay = formattedLastWorkingDay || resignData.lastWorkingDay || (isEn ? "[Last Working Day]" : "[Tanggal Terakhir Bekerja]");
  const defaultReasonOption = resignData.reasonOption || (isEn ? "[Your resignation reason]" : "[Alasan pengunduran diri Anda]");
  const defaultCustomMessage = resignData.customMessage || t(selectedLanguage, 'resignParagraph3Default');

  const handlePrintOrDownload = async () => {
    setDownloading(true);
    const fileName = resignData.senderName
      ? `Surat-Pengunduran-Diri-${resignData.senderName.replace(/\s+/g, '-')}_lungaresume.pdf`
      : 'Surat-Pengunduran-Diri_lungaresume.pdf';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${t(selectedLanguage, 'subjectResign')} - ${defaultSenderName}</title>
          <style>
            @page { size: A4; margin: 25mm 20mm 20mm 20mm; }
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              background: #fff;
              padding: 0;
              margin: 0;
            }
            .header-date { text-align: right; margin-bottom: 24px; font-weight: 500; }
            .recipient { margin-bottom: 24px; }
            .subject { font-weight: bold; margin-bottom: 24px; text-transform: uppercase; text-decoration: underline; }
            .body-paragraph { text-align: justify; text-indent: 30px; margin-bottom: 16px; }
            .signature { margin-top: 48px; }
            .signature-space { height: 70px; }
          </style>
        </head>
        <body>
          <div class="header-date">${defaultLocationDate}</div>

          <div class="recipient">
            ${t(selectedLanguage, 'dearSalutation')}<br/>
            <strong>${defaultRecipientName}</strong><br/>
            ${defaultRecipientRole}<br/>
            ${defaultCompanyName}
          </div>

          <div class="subject">${t(selectedLanguage, 'subjectResign')}</div>

          <p>${t(selectedLanguage, 'salutation')}</p>

          <p class="body-paragraph">
            ${t(selectedLanguage, 'resignParagraph1')} <strong>${defaultSenderName}</strong> ${t(selectedLanguage, 'resignParagraph1Mid')} <strong>${defaultSenderRole}</strong> ${t(selectedLanguage, 'resignParagraph1At')} <strong>${defaultCompanyName}</strong>, ${t(selectedLanguage, 'resignParagraph1End')} <strong>${defaultLastWorkingDay}</strong>.
          </p>

          <p class="body-paragraph">
            ${t(selectedLanguage, 'resignParagraph2Prefix')} ${defaultReasonOption}.
          </p>

          <p class="body-paragraph">
            ${defaultCustomMessage}
          </p>

          <p class="body-paragraph">
            ${t(selectedLanguage, 'resignParagraph4')}
          </p>

          <div class="signature">
            ${t(selectedLanguage, 'sincerely')}<br/>
            <div class="signature-space"></div>
            <strong>${defaultSenderName}</strong><br/>
            <span>${defaultSenderRole}</span>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch('/api/generate-resign-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent,
          fileName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF via server route');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.warn("Server PDF download failed, falling back to print dialog:", err);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent + `<script>window.onload = function() { window.print(); window.close(); }</script>`);
        printWindow.document.close();
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="h-full min-h-[600px] xl:min-h-0 bg-neutral-900/90 flex flex-col items-center justify-start p-4 md:p-8 overflow-auto">
      {/* Top Action Toolbar */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-4 flex-shrink-0 bg-neutral-800/80 p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2 text-white">
          <FileText className="w-4 h-4 text-red-400" />
          <span className="text-xs font-semibold">{t(selectedLanguage, 'resignPreviewNotice')}</span>
        </div>
        <Button
          onClick={handlePrintOrDownload}
          disabled={downloading}
          className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs px-4 py-2 rounded-lg gap-2 shadow-md hover:shadow-red-900/40 transition-all active:scale-95"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{downloading ? t(selectedLanguage, 'generatingPdf') : t(selectedLanguage, 'downloadPdf')}</span>
        </Button>
      </div>

      {/* A4 Paper Document Preview Container */}
      <div className="w-full max-w-3xl flex-grow flex items-center justify-center py-4">
        <div
          ref={letterRef}
          className="bg-white text-neutral-900 shadow-2xl rounded-sm w-full max-w-[720px] min-h-[1000px] p-12 md:p-16 flex flex-col justify-between font-serif border border-neutral-200 leading-relaxed text-sm md:text-base relative"
        >
          <div>
            {/* Header Tanggal */}
            <div className="text-right text-neutral-600 font-sans text-xs md:text-sm mb-8 font-medium">
              {defaultLocationDate}
            </div>

            {/* Kepada Yth */}
            <div className="mb-6 space-y-0.5 text-neutral-800">
              <p className="text-neutral-500 text-xs uppercase tracking-wider font-sans">{t(selectedLanguage, 'dearSalutation')}</p>
              <p className="font-bold text-neutral-900 text-base">{defaultRecipientName}</p>
              <p className="text-neutral-700">{defaultRecipientRole}</p>
              <p className="font-semibold text-neutral-800">{defaultCompanyName}</p>
            </div>

            {/* Perihal */}
            <div className="mb-6">
              <span className="font-bold uppercase tracking-wide border-b-2 border-neutral-900 pb-0.5">
                {t(selectedLanguage, 'subjectResign')}
              </span>
            </div>

            {/* Isi Surat */}
            <div className="space-y-4 text-justify text-neutral-800 text-sm md:text-base">
              <p>{t(selectedLanguage, 'salutation')}</p>

              <p className="indent-8">
                {t(selectedLanguage, 'resignParagraph1')} <strong className="text-neutral-900">{defaultSenderName}</strong> {t(selectedLanguage, 'resignParagraph1Mid')} <strong className="text-neutral-900">{defaultSenderRole}</strong> {t(selectedLanguage, 'resignParagraph1At')} <strong className="text-neutral-900">{defaultCompanyName}</strong>, {t(selectedLanguage, 'resignParagraph1End')} <strong className="text-neutral-900">{defaultLastWorkingDay}</strong>.
              </p>

              <p className="indent-8">
                {t(selectedLanguage, 'resignParagraph2Prefix')} {defaultReasonOption}.
              </p>

              <p className="indent-8">
                {defaultCustomMessage}
              </p>

              <p className="indent-8">
                {t(selectedLanguage, 'resignParagraph4')}
              </p>
            </div>
          </div>

          {/* Tanda Tangan */}
          <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col items-end">
            <div className="w-48 text-left space-y-1">
              <p className="text-xs text-neutral-500 font-sans">{t(selectedLanguage, 'sincerely')}</p>
              <div className="h-16"></div>
              <p className="font-bold text-neutral-900 text-sm">{defaultSenderName}</p>
              <p className="text-xs text-neutral-600 font-sans">{defaultSenderRole}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
