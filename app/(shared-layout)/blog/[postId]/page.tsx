import { CommentSection } from "@/components/CommentSection";
import { PostPresence } from "@/components/PostPresence";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchQuery, preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface PostIdRouteProps {
    params: {
        postId: Id<"posts">;
    }
}

export async function generateMetadata({ params }: PostIdRouteProps): Promise<Metadata> {
    const { postId } = await params;
    const post = await fetchQuery(api.posts.getPostById, { postId: postId });
    if (!post) {
        return {
            title: "Post not found | Darrin Holtz",
        };
    }
    return {
        title: `${post.title} | Darrin Holtz`,
        description: post.body.slice(0, 160),
        category: "Web development",
        authors: [{ name: "Darrin Holtz" }],
    }
}

export default async function PostIdRoute({ params }: PostIdRouteProps){
    const { postId } = await params;
    const token = await getToken();
    const [post, preloadedComments, userId] = await Promise.all([
        fetchQuery(api.posts.getPostById, { postId: postId }),
        preloadQuery(api.comments.getCommentsByPostId, {
        postId: postId,
        }),
        await fetchQuery(api.presence.getUserId, {}, { token }),        
    ]);
    
    if (!post) {
        return (
            <div>
                <h1>Post not found</h1>
            </div>
        );
    }
    
    return(
        <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
            <Link className={buttonVariants({ variant: "outline", className: "mb-4" })} href="/blog">
                <ArrowLeft className="size-4"/>
                Back to Blog
            </Link>
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
                <Image src={post.imageUrl ?? "/default-image.jpg"} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Posted on: {new Date(post._creationTime).toLocaleDateString()}</p>
                    {userId && <PostPresence roomId={post._id} userId={userId} />}
                </div>
            </div>
             <Separator className="my-8" />
            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>
            <Separator className="my-8" />
            <CommentSection preloadedComments={preloadedComments}/>
        </div>
    )
}