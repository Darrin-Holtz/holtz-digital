import { CommentSection } from "@/components/CommentSection";
import { PostPresence } from "@/components/PostPresence";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { preloadQuery, fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await fetchQuery(api.posts.getPostBySlug, { slug });

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

  const post = await fetchQuery(api.posts.getPostBySlug, { slug });

  if (!post) redirect("/blog");

  const imageSrc =
    post.imageUrl && post.imageUrl.trim() !== ""
      ? post.imageUrl
      : "/default-image.jpg";

  const preloadedComments = await preloadQuery(
    api.comments.getCommentsByPostId,
    { postId: post._id }
  );

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

      <Separator className="my-8" />

      <p className="whitespace-pre-wrap">{post.body}</p>

      <Separator className="my-8" />

      <CommentSection postId={post._id} preloadedComments={preloadedComments} />
    </div>
  );
}