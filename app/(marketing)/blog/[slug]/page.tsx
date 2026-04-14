import { PostCommentsWidget, PostPresenceWidget } from "@/components/PostLiveWidgets";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 900;
export const dynamicParams = false;

const getPosts = unstable_cache(async () => {
  return fetchQuery(api.posts.getPosts);
}, ["blog-posts"], { revalidate: 900, tags: ["posts"] });

const getPostBySlug = unstable_cache(async (slug: string) => {
  return fetchQuery(api.posts.getPostBySlug, { slug });
}, ["blog-post-by-slug"], { revalidate: 900, tags: ["posts"] });

export async function generateStaticParams() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return [{ slug: "__placeholder__" }];
  }

  return Array.from(new Set(posts.map((post) => post.slug))).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found | Darrin Holtz" };
  }

  return {
    title: `${post.title} | Darrin Holtz`,
    description: post.body?.slice(0, 160) ?? "",
  };
}

export default async function PostSlugRoute({ params }: PageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const imageSrc =
    post.imageUrl && post.imageUrl.trim() !== ""
      ? post.imageUrl
      : "/default-image.jpg";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
        href="/blog"
      >
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
        <Image src={imageSrc} alt={post.title} fill className="object-cover" />
      </div>

      <h1 className="text-4xl font-bold">{post.title}</h1>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Posted on: {new Date(post._creationTime).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <PostPresenceWidget postId={post._id} />
      </div>

      <Separator className="my-8" />

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      <Separator className="my-8" />

      <PostCommentsWidget postId={post._id} />
    </div>
  );
}