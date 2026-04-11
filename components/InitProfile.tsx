"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";

export default function InitProfile() {
  const { data: session } = authClient.useSession();
  const createProfile = useMutation(api.profiles.createProfile);

  useEffect(() => {
    if (!session?.user) return;

    createProfile({
      userId: session.user.id,
      email: session.user.email,
      role: "user", // default role
    });
  }, [session, createProfile]);

  return null;
}