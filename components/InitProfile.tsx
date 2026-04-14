"use client";

import { useEffect } from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";

export default function InitProfile() {
  const { data: session } = authClient.useSession();
  const { isAuthenticated } = useConvexAuth();
  const createProfile = useMutation(api.profiles.createProfile);
  const profile = useQuery(
    api.profiles.getCurrentProfile,
    isAuthenticated ? {} : "skip"
  );

  useEffect(() => {
    if (!session?.user || !isAuthenticated) return;
    if (profile === undefined || profile) return;

    void createProfile({});
  }, [session, isAuthenticated, profile, createProfile]);

  return null;
}