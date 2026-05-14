"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import usePresence from "@convex-dev/presence/react";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";

const FacePile = dynamic(() => import("@convex-dev/presence/facepile"), {
  ssr: false,
});

interface iAppProps {
  roomId: Id<"posts">;
}

// Inner component — only rendered when userId is a real, loaded value.
function PostPresenceInner({ roomId, userId }: { roomId: Id<"posts">; userId: string }) {
  const presenceState = usePresence(api.presence, String(roomId), userId);

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

// Outer component — waits for userId before mounting the hook.
export function PostPresence({ roomId }: iAppProps) {
  const userId = useQuery(api.presence.getUserId);

  if (!userId) {
    return null;
  }

  return <PostPresenceInner roomId={roomId} userId={String(userId)} />;
}