import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term")?.trim() ?? "";

  if (term.length < 2) {
    return NextResponse.json([]);
  }

  const results = await fetchQuery(api.posts.searchPosts, {
    term,
    limit: 5,
  });

  return NextResponse.json(results);
}