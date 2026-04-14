"use client";

import { CommentSection } from "@/components/CommentSection";
import { PostPresence } from "@/components/PostPresence";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function PostPresenceWidget({ postId }: { postId: Id<"posts"> }) {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return <PostPresence roomId={postId} />;
}

export function PostCommentsWidget({ postId }: { postId: Id<"posts"> }) {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return <CommentSection postId={postId} />;
}