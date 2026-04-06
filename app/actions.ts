"use server";

import { z } from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(values);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Invalid input");
    }

    const cookie = (await headers()).get("cookie") ?? "";
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

    const res = await fetch(`${origin}/api/auth/convex/token`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch Convex token:", await res.text());
      throw new Error("Failed to fetch Convex token");
    }

    const data: { token?: string } = await res.json();
    const { token } = data;

    if (!token) {
      console.error("No token received from /api/auth/convex/token");
      throw new Error("No token received");
    }

    await fetchMutation(api.posts.createPost, {
      title: parsed.data.title,
      body: parsed.data.content,
    }, { token });

    return redirect("/");
  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    throw err;
  }
}