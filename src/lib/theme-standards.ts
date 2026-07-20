/**
 * Standard Design Tokens for Resume Templates
 * Ensures consistent typography, spacing, and sizing across all templates
 * to prevent content cutoff/overflow when changing themes.
 */
export const themeStandards = {
  // Sizing & Typography (Tailwind Classes)
  typography: {
    name: "text-2xl md:text-3xl font-bold tracking-tight",
    role: "text-xs md:text-sm font-medium tracking-wide",
    sectionTitle: "text-xs md:text-sm font-bold uppercase tracking-wider",
    body: "text-xs leading-relaxed",
    subTitle: "text-xs font-semibold",
    meta: "text-[10px] md:text-xs font-mono opacity-80",
  },
  
  // Spacing & Layout (Tailwind Classes)
  spacing: {
    containerClass: "w-full h-full overflow-hidden select-none",
    containerPadding: "p-6 md:p-8",
    sectionMargin: "mb-4",
    sectionGap: "space-y-3",
    itemMargin: "mb-3",
    itemGap: "space-y-1.5",
    gridGap: "gap-4 md:gap-6",
    divider: "my-4 opacity-20",
  },

  // Component Sizes
  components: {
    photoSize: "w-20 h-20 rounded-full object-cover",
    iconSize: 12,
    badge: "text-xs px-2 py-0.5 rounded",
  },

  // Color Contrast & Accessibility Helpers
  colors: {
    isLight: (hexColor: string): boolean => {
      if (!hexColor || !hexColor.startsWith('#')) return true; // Default to light if invalid
      const hex = hexColor.replace('#', '');
      if (hex.length !== 6 && hex.length !== 3) return true;
      
      let r = 255, g = 255, b = 255;
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else if (hex.length === 3) {
        r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
      }
      
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155;
    },
    
    // Automatically yields high contrast text (either near-black or white)
    getContrastText: (bgHex: string): string => {
      return themeStandards.colors.isLight(bgHex) ? '#1E293B' : '#F8FAFC';
    },

    // Safely add opacity to hex color
    hexToRgba: (hex: string, opacity: number): string => {
      if (!hex || !hex.startsWith('#')) return `rgba(0, 0, 0, ${opacity})`;
      const cleanHex = hex.replace('#', '');
      let r = 0, g = 0, b = 0;
      if (cleanHex.length === 6) {
        r = parseInt(cleanHex.substring(0, 2), 16);
        g = parseInt(cleanHex.substring(2, 4), 16);
        b = parseInt(cleanHex.substring(4, 6), 16);
      } else if (cleanHex.length === 3) {
        r = parseInt(cleanHex.substring(0, 1) + cleanHex.substring(0, 1), 16);
        g = parseInt(cleanHex.substring(1, 2) + cleanHex.substring(1, 2), 16);
        b = parseInt(cleanHex.substring(2, 3) + cleanHex.substring(2, 3), 16);
      }
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
} as const;
