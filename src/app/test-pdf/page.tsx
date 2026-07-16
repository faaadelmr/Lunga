// This is a test page for PDF generation
"use client";

import { useState } from 'react';

export default function TestPdfPage() {
  const [loading, setLoading] = useState(false);

  const testData = {
    resumeData: {
      personal: {
        name: "John Doe",
        role: "Software Engineer",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        website: "johndoe.com",
        description: "Experienced software engineer with a passion for creating efficient and scalable applications."
      },
      experience: [
        {
          company: "Tech Corp",
          role: "Senior Developer",
          date: "2020 - Present",
          description: "Developed and maintained web applications using React and Node.js. Led a team of 5 developers."
        }
      ],
      education: [
        {
          institution: "University of Technology",
          degree: "Bachelor of Science in Computer Science",
          date: "2016 - 2020",
          description: "Graduated with honors. Specialized in software engineering."
        }
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "A full-stack e-commerce solution with payment integration.",
          technologies: "React, Node.js, MongoDB",
          link: "https://github.com/johndoe/ecommerce"
        }
      ],
      skills: "JavaScript, TypeScript, React, Node.js, Python, SQL"
    },
    template: "modern",
    color: "#1f2937",
    bgColor: "#ffffff",
    textColor: "#000000",
    font: "Inter",
    fileName: "test-resume.pdf"
  };

  const handleTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = testData.fileName;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">PDF Generation Test</h1>
        <p className="mb-6 text-muted-foreground">
          This page tests the PDF generation API endpoint. Click the button below to generate a test resume PDF.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleTest}
            disabled={loading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Test PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}