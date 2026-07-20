"use client";
import { useEffect } from 'react';

interface GoogleFontLoaderProps {
  font: string;
  onValidation?: (isValid: boolean) => void;
}

export function GoogleFontLoader({ font, onValidation }: GoogleFontLoaderProps) {
  useEffect(() => {
    if (!font) return;
    
    const presets = ['Lato', 'Inter', 'Space Grotesk', 'Roboto', 'Montserrat', 'Open Sans', 'Merriweather', 'Source Sans Pro', 'Playfair Display'];
    if (presets.includes(font)) {
      if (onValidation) onValidation(true);
      return;
    }

    const id = `gfont-${font.toLowerCase().replace(/\s+/g, '-')}`;
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800&display=swap`;

    const timer = setTimeout(async () => {
      try {
        // Query our server-side validation route to avoid client-side CORS issues
        const res = await fetch(`/api/validate-font?font=${encodeURIComponent(font)}`);
        const data = await res.json();
        
        if (data.isValid) {
          if (onValidation) onValidation(true);
          
          if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
          }
        } else {
          if (onValidation) onValidation(false);
        }
      } catch (error) {
        if (onValidation) onValidation(true);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [font, onValidation]);

  return null;
}
