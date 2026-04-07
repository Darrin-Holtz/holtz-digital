"use server";

import { z } from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createBlogAction(
  values: z.infer<typeof postSchema>
) {
  // ✅ Validate input
  const parsed = postSchema.safeParse(values);

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid input");
  }

  const { title, content, image } = parsed.data;

  // ✅ Get auth token
  const cookie = (await headers()).get("cookie") ?? "";
  const origin =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

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
    throw new Error("No token received");
  }

  // ✅ Upload image (SAFE because image is required in schema)
  const imageUrl = await fetchMutation(
    api.posts.generateImageUploadUrl,
    {},
    { token }
  );

  const uploadResult = await fetch(imageUrl, {
    method: "POST",
    headers: {
      "Content-Type": parsed.data.image.type,
    },
    body: parsed.data.image,
  });

  if (!uploadResult.ok) {
    throw new Error("Failed to upload image");
  }

  const { storageId } = await uploadResult.json();

  // ✅ Create post
  await fetchMutation(
    api.posts.createPost,
    {
      title,
      body: content,
      imageStorageId: storageId,
    },
    { token }
  );

  // ✅ Redirect after success
  redirect("/");
}