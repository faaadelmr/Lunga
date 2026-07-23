
"use client";

import { useState, type ChangeEvent } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function AiAssistPanel() {
  const { handleAnalyzeResume, isAiLoading, selectedAiModel, setSelectedAiModel, aiProgress, aiProgressStep } = useResume();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const { toast } = useToast();

  const allowedTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/bmp',
    'image/x-portable-anymap',
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isAllowed = allowedTypes.includes(file.type) || 
        /\.(pdf|png|jpe?g|webp|bmp|pnm)$/i.test(file.name);

      if (!isAllowed) {
        toast({
          variant: "destructive",
          title: "Format Berkas Tidak Didukung",
          description: "Format yang didukung: PDF, PNG, JPG/JPEG, WEBP, BMP, dan PNM.",
        });
        e.target.value = ''; // Reset input
        setPreviewUrl(null);
        setSelectedFile(null);
        setIsPdf(false);
        return;
      }

      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setIsPdf(true);
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setIsPdf(false);
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAnalyzeClick = async () => {
    if (previewUrl) {
      try {
        await handleAnalyzeResume(previewUrl);
        toast({
          title: "Success!",
          description: "Resume analyzed successfully. Your CV has been updated.",
        });
      } catch (error: any) {
        // Check for common AI-related errors and provide helpful messages
        let errorMessage = "Failed to analyze the resume. Please try again.";

        if (error?.message) {
          const errorMsg = error.message.toLowerCase();

          if (
            errorMsg.includes("quota") ||
            errorMsg.includes("limit") ||
            errorMsg.includes("rate") ||
            errorMsg.includes("429") ||
            errorMsg.includes("resource_exhausted")
          ) {
            errorMessage = "AI quota limit reached. Please select other AI Models or fill out your CV details manually in the form.";
          } else if (
            errorMsg.includes("api key") ||
            errorMsg.includes("authentication") ||
            errorMsg.includes("auth") ||
            errorMsg.includes("api_key_invalid") ||
            errorMsg.includes("400")
          ) {
            errorMessage = "Invalid or missing AI API Key. Please select other AI Models or fill out your CV details manually in the form.";
          } else if (errorMsg.includes("model") || errorMsg.includes("resource")) {
            errorMessage = "AI model currently unavailable. Please select other AI Models or fill out your CV details manually in the form.";
          } else if (errorMsg.includes("timeout") || errorMsg.includes("exceeded")) {
            errorMessage = "AI request timed out. Please select other AI Models or proceed with manual CV entry in the form.";
          }
        }

        toast({
          variant: "destructive",
          title: "AI Analysis Failed",
          description: errorMessage,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload an image or PDF of your resume first.",
      });
    }
  };

  return (
    <Card className="bg-background border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline"><Wand2 /> AI Re-write</CardTitle>
        <CardDescription>
          Upload an image or PDF of your old CV, and AI will re-write it for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ai-model-select">Select AI Model</Label>
          <Select value={selectedAiModel} onValueChange={(value) => setSelectedAiModel(value as any)}>
            <SelectTrigger id="ai-model-select">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cerebras/gemma-4-31b">🚀 Cerebras: Gemma 4 31B (Recommended)</SelectItem>
              <SelectItem value="llama-3.3-70b-versatile">⚡ Groq: Llama 3.3 70B</SelectItem>
              <SelectItem value="gemini-2.0-flash-lite" className="hidden">🪶 Gemini: 2.0 Flash Lite</SelectItem>
              <SelectItem value="openrouter/auto">🌐 OpenRouter (Free Auto Router)</SelectItem>
            </SelectContent>
          </Select>
      </div>

        <div className="space-y-2">
          <Label htmlFor="resume-upload">Upload Resume (PDF, PNG, JPG, WEBP, BMP, PNM)</Label>
          <Input id="resume-upload" type="file" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg,.webp,.bmp,.pnm" />
        </div>

        {selectedFile && previewUrl && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">File Preview:</p>
            <div className="border rounded-lg p-4 bg-secondary/50 flex items-center justify-center">
              {isPdf ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <FileText className="w-16 h-16 text-primary" />
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">PDF preview is not available. Ready to be analyzed.</p>
                </div>
              ) : (
                <Image
                  src={previewUrl}
                  alt="Resume preview"
                  width={300}
                  height={424}
                  className="rounded-md object-contain max-h-[424px] w-auto mx-auto"
                />
              )}
            </div>
          </div>
        )}

        {isAiLoading && (
          <div className="space-y-2 p-4 bg-muted/40 rounded-lg border animate-pulse">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-primary">{aiProgressStep || "Menganalisis CV..."}</span>
              <span className="text-muted-foreground">{aiProgress}%</span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out"
                style={{ width: `${aiProgress}%` }}
              />
            </div>
          </div>
        )}

        <Button onClick={handleAnalyzeClick} disabled={isAiLoading || !selectedFile} className="w-full">
          {isAiLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menganalisis ({aiProgress}%)...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Analyze Resume
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
