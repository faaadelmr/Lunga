import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ResumeProvider } from '@/context/resume-context';

export const metadata: Metadata = {
  title: 'Lunga - AI-Powered Resume Builder & Professional CV Generator',
  description: 'Create, rewrite, and design ATS-friendly professional resumes instantly with AI assistance and beautiful multi-style templates.',
  keywords: ['Resume Builder', 'CV Generator', 'ATS Resume', 'AI Resume Rewriter', 'Professional CV', 'Lunga'],
  authors: [{ name: 'Lunga Team' }],
  openGraph: {
    title: 'Lunga - AI-Powered Resume Builder',
    description: 'Build and optimize your ATS-friendly resume with instant AI enhancement.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lunga',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lunga - AI Resume Builder',
    description: 'Craft ATS-ready resumes with modern templates and AI enhancement.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ResumeProvider>
          {children}
        </ResumeProvider>
        <Toaster />
      </body>
    </html>
  );
}
