'use client';

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";

// ✅ Infer type directly from schema
type FormValues = z.infer<typeof postSchema>;

export default function CreateRoute() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const createPost = useMutation(api.posts.createPost);
  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined, // ✅ matches optional schema
    },
  });

  // ✅ Correct typing
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    startTransition(async () => {
      try {
        let imageStorageId = undefined;

        // ✅ Step 1: upload image (if exists)
        if (values.image) {
          const uploadUrl = await generateUploadUrl();

          const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": values.image.type },
            body: values.image,
          });

          if (!result.ok) {
            throw new Error("Image upload failed");
          }

          const { storageId } = await result.json();
          imageStorageId = storageId;
        }

        // ✅ Step 2: create post in Convex
        await createPost({
          title: values.title,
          body: values.content, // ⚠️ note: body not content
          imageStorageId,
        });

        form.reset();
        router.push("/blog");
        toast.success("Post created!");

      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-lg text-muted-foreground pt-4">
          Share your thoughts with the world
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            Create a new blog article and share your thoughts.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">

              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Super exciting title"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Content */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Your blog content here"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Image */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Submit */}
              <Button disabled={isPending || !form.formState.isValid}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Create Post</span>
                )}
              </Button>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}