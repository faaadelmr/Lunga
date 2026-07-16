"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TemplatePreviewComponent } from '@/components/template-preview';

export default function PrintContent() {
  const searchParams = useSearchParams();
  const [templateData, setTemplateData] = useState<any>(null);

  useEffect(() => {
    // Get the resume data from URL params or local storage
    const dataParam = searchParams.get('data');
    const templateParam = searchParams.get('template');
    const colorParam = searchParams.get('color');
    const bgColorParam = searchParams.get('bgColor');
    const textColorParam = searchParams.get('textColor');
    const fontParam = searchParams.get('font');

    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setTemplateData({
          data: parsedData,
          template: templateParam || 'modern',
          color: colorParam || '#1f2937',
          bgColor: bgColorParam || '#ffffff',
          textColor: textColorParam || '#000000',
          font: fontParam || 'Inter'
        });
      } catch (e) {
        console.error('Error parsing resume data:', e);
      }
    }

    // Trigger print after content loads
    const handleAfterPrint = () => {
      // Close the print window after printing if needed
      // window.close();
    };

    const handleBeforePrint = () => {
      // Optional: Add any print preparation
    };

    window.addEventListener('afterprint', handleAfterPrint);
    window.addEventListener('beforeprint', handleBeforePrint);

    // Auto-print after a short delay to ensure content is loaded
    const timer = setTimeout(() => {
      window.print();
    }, 1500);  // Wait a bit longer to ensure all content is loaded

    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
      window.removeEventListener('beforeprint', handleBeforePrint);
      clearTimeout(timer);
    };
  }, [searchParams]);

  if (!templateData) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg">Loading resume for printing...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white print-container"
      style={{
        width: '210mm',
        margin: 0,
        padding: 0,
        backgroundColor: 'white'
      }}
    >
      <div className="w-full">
        <TemplatePreviewComponent
          data={templateData.data}
          template={templateData.template}
          color={templateData.color}
          bgColor={templateData.bgColor}
          textColor={templateData.textColor}
          font={templateData.font}
        />
      </div>
    </div>
  );
}