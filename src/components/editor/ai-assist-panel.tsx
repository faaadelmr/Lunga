
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
  const { handleAnalyzeResume, isAiLoading, selectedAiModel, setSelectedAiModel } = useResume();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setIsPdf(false);
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        setIsPdf(true);
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload an image or PDF file.",
        });
        e.target.value = ''; // Reset the input
        setPreviewUrl(null);
        setSelectedFile(null);
        setIsPdf(false);
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

          if (errorMsg.includes("quota") || errorMsg.includes("limit") || errorMsg.includes("rate")) {
            errorMessage = "AI usage limit has been reached. Try using a different model or try again later.";
          } else if (errorMsg.includes("api key") || errorMsg.includes("authentication") || errorMsg.includes("auth")) {
            errorMessage = "AI service authentication issue. Please check your API configuration.";
          } else if (errorMsg.includes("model") || errorMsg.includes("resource")) {
            errorMessage = "Selected AI model is unavailable. Please try switching to a different model.";
          } else if (errorMsg.includes("timeout") || errorMsg.includes("exceeded")) {
            errorMessage = "AI analysis took too long. Please try again or use a different model.";
          }
        }

        toast({
          variant: "destructive",
          title: "Analysis failed",
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
          <Label htmlFor="ai-model-select">Select AI Model (via Gemini AI Genkit)</Label>
          <Select value={selectedAiModel} onValueChange={(value) => setSelectedAiModel(value as any)}>
            <SelectTrigger id="ai-model-select">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-flash-lite-latest">🪶 Gemini Flash Lite Latest (Recommended)</SelectItem>
              <SelectItem value="gemini-3.5-flash">⚡ Gemini 3.5 Flash</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {selectedAiModel === 'gemini-flash-lite-latest'
              ? '🪶 Lightweight - faster response time, highly recommended for PDF'
              : '⚡ Powerful - better accuracy for images & complex layouts'}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">Powered by Gemini AI Genkit</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume-upload">Upload Resume (Image or PDF)</Label>
          <Input id="resume-upload" type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
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

        <Button onClick={handleAnalyzeClick} disabled={isAiLoading || !selectedFile} className="w-full">
          {isAiLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
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
