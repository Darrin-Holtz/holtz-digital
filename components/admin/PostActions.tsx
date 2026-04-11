"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface PostActionsProps {
  postId: Id<"posts">;
  slug?: string;
}

export default function PostActions({ postId, slug }: PostActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const deletePost = useMutation(api.posts.deletePost);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deletePost({ postId });
        toast.success("Post deleted");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete post");
      }
    });
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      <Link href={slug ? `/blog/${slug}` : `/dashboard/posts/${postId}`}>
        <Button variant="outline" size="sm" className="text-xs">
          View
        </Button>
      </Link>
      <Link href={`/dashboard/posts/${postId}`}>
        <Button size="sm" className="text-xs">
          Edit
        </Button>
      </Link>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="text-xs"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
