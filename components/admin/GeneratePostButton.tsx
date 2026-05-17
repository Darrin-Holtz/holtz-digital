"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function GeneratePostButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const scheduleAiPost = useMutation(api.posts.scheduleAiPost);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await scheduleAiPost({});
      toast.success(
        "AI post generation started — it will appear in the posts list in about 30–60 seconds.",
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to schedule post generation. Check that OPENAI_API_KEY and UNSPLASH_ACCESS_KEY are set in the Convex dashboard.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={isGenerating}
      variant="outline"
      className="gap-2"
    >
      <Sparkles className="w-4 h-4" />
      {isGenerating ? "Scheduling…" : "Generate AI Post Now"}
    </Button>
  );
}
