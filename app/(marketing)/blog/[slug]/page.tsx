// app/(marketing)/blog/[slug]/page.tsx

import { CommentSection } from "@/components/CommentSection";
import { PostPresence } from "@/components/PostPresence";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { preloadQuery, fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

/**
 * Next.js 16 requires params to be treated as async
 */
type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * SEO metadata (NO sync params access)
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await fetchQuery(api.posts.getPostBySlug, { slug });

  if (!post) {
    return {
      title: "Post not found | Darrin Holtz",
    };
  }

  return {
    title: `${post.title} | Darrin Holtz`,
    description: post.body?.slice(0, 160) ?? "",
    category: "Web development",
    authors: [{ name: "Darrin Holtz" }],
  };
}

/**
 * Blog post page
 */
export default async function PostSlugRoute({ params }: PageProps) {
  const { slug } = await params;
  const token = await getToken();
  const post = await fetchQuery(api.posts.getPostBySlug, { slug });

  if (!post) {
    redirect("/blog");
  }

  const imageSrc = post.imageUrl && post?.imageUrl.trim() !== ""
  ? post.imageUrl
  : "/default-image.jpg";

  const [preloadedComments, userId] = await Promise.all([
    preloadQuery(api.comments.getCommentsByPostId, {
      postId: post._id,
    }),
    fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
        href="/blog"
      >
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={imageSrc}
          alt={post.title}
          loading="eager"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Posted on: {new Date(post._creationTime).toLocaleDateString()}
          </p>

          {userId && (
            <PostPresence roomId={post._id} userId={userId} />
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {post.body}
      </p>

      <Separator className="my-8" />

      <CommentSection
        postId={post._id} 
        preloadedComments={preloadedComments} 
      />
    </div>
  );
}