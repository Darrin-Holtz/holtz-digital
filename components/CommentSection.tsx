"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comments";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Id } from "@/convex/_generated/dataModel";
import {
Preloaded,
useMutation,
usePreloadedQuery,
useConvexAuth,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { useTransition, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";

export function CommentSection(props: {
postId: Id<"posts">;
preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) {
const [isPending] = useTransition();
const data = usePreloadedQuery(props.preloadedComments);
const createComment = useMutation(api.comments.createComment);
const { isAuthenticated, isLoading } = useConvexAuth();

// ✅ Hydration safety fix
const [mounted, setMounted] = useState(false);
useEffect(() => {
setMounted(true);
}, []);

const form = useForm({
resolver: zodResolver(commentSchema),
defaultValues: {
postId: props.postId,
body: "",
},
});

async function onSubmit(data: z.infer<typeof commentSchema>) {
try {
await createComment({
postId: props.postId,
body: data.body,
});

  form.reset();
  toast.success("Comment created successfully!");
} catch (err) {
  console.error(err);
  toast.error("You must be logged in to comment.");
}

}

if (data === undefined) {
return <p>loading...</p>;
}

// ✅ Prevent hydration mismatch completely
if (!mounted) {
return null;
}

return ( 
    <Card> 
        <CardHeader className="flex flex-row items-center gap-2 border-b"> 
            <MessageSquare className="size-5" /> 
                <h2 className="text-xl font-bold">
                    {data.length} Comments 
                </h2> 
        </CardHeader>
        <CardContent>
            {/* COMMENT INPUT */}
            {isAuthenticated ? (
            <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Controller
                name="body"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel>Comment</FieldLabel>
                    <Textarea
                        {...field}
                        placeholder="Share your thoughts..."
                        aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                )}
                />

                <Button type="submit" disabled={isPending} className="mb-6">
                {isPending ? (
                    <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting...</span>
                    </>
                ) : (
                    <span>Comment</span>
                )}
                </Button>
            </form>
            ) : (
            <div className="mb-6 border rounded-lg p-4 text-center">
                <p className="text-muted-foreground mb-3">
                You must be signed in to leave a comment.
                </p>
                <Link href="/auth/login">
                <Button>Login to Comment</Button>
                </Link>
            </div>
            )}

            {/* COMMENTS LIST */}
            {data?.length > 0 && <Separator />}

            <section className="space-y-6 mt-6">
            {data?.map((comment) => (
                <div key={comment._id} className="flex gap-4">
                <Avatar className="size-10 shrink-0">
                    <AvatarImage
                    src={`https://avatar.vercel.sh/${encodeURIComponent(
                        comment.authorName
                    )}`}
                    alt={comment.authorName}
                    />
                    <AvatarFallback>
                    {comment.authorName
                        ?.slice(0, 2)
                        .toUpperCase() ?? "U"}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                        {comment.authorName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                        {new Date(
                        comment._creationTime
                        ).toLocaleDateString("en-US")}
                    </p>
                    </div>

                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {comment.body}
                    </p>
                </div>
                </div>
            ))}
            </section>
        </CardContent>
    </Card> 
    );
}
