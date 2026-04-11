import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

{ /*export const dynamic = "force-static";
export const revalidate = 30; */ }

export const metadata: Metadata = {
  title: "Blog | Darrin Holtz",
  description: "Read our latest articles d insights.",
  category: "Web development",
  authors: [{ name: "Darrin Holtz" }],
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts and trends from our team.
        </p>
      </div>
      <Suspense fallback={<SkeletonLoadingUi />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

function toTextExcerpt(html: string, maxLength = 140) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function LoadBlogList() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog");
  const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.imageUrl ?? "https://images.unsplash.com/photo-1773754532196-014342510e64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"}
              alt="image"
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-t-lg object-cover"
            />
          </div>

          <CardContent>
            <div className="text-red-500 text-sm">
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{toTextExcerpt(post.body)}</p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                className: "w-full",
              })}
              href={`/blog/${post.slug}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/" />
          </div>
        </div>
      ))}
    </div>
  );
}