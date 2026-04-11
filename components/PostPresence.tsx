"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import usePresence from "@convex-dev/presence/react";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FacePile = dynamic(() => import("@convex-dev/presence/facepile"), {
  ssr: false,
});

interface iAppProps {
  roomId: Id<"posts">;
}

export function PostPresence({ roomId }: iAppProps) {
  const userId = useQuery(api.presence.getUserId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Call hooks unconditionally first, then check conditions
  const roomIdString = String(roomId);
  const userIdString = userId ? String(userId) : "";
  const presenceState = usePresence(api.presence, roomIdString, userIdString);

  // Check conditions after all hooks - return early if userId not ready
  if (!mounted || !userId || userId === undefined || userId === null || !userIdString) {
    return null;
  }

  if (!presenceState || presenceState.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Viewing now
      </p>
      <div className="text-black">
        <FacePile presenceState={presenceState} />
      </div>
    </div>
  );
}