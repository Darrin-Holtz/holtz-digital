"use client";

import { postSchema } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  mode: "create" | "edit";
  postId?: Id<"posts">;
  initialTitle?: string;
  initialContent?: string;
}

export default function PostForm({
  mode,
  postId,
  initialTitle = "",
  initialContent = "",
}: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [editorResetKey, setEditorResetKey] = useState(0);
  const router = useRouter();

  const createPost = useMutation(api.posts.createPost);
  const updatePost = useMutation(api.posts.updatePost);
  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialTitle,
      content: initialContent,
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    startTransition(async () => {
      try {
        let imageStorageId: Id<"_storage"> | undefined = undefined;

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
          imageStorageId = storageId as Id<"_storage">;
        }

        if (mode === "create") {
          await createPost({
            title: values.title,
            body: values.content,
            imageStorageId,
          });
          form.reset({
            title: "",
            content: "",
            image: undefined,
          });
          setEditorResetKey((prev) => prev + 1);
          toast.success("Post created!");
          return;
        } else {
          if (!postId) {
            throw new Error("Missing post id for edit");
          }

          await updatePost({
            postId,
            title: values.title,
            body: values.content,
            imageStorageId,
          });
          toast.success("Post updated!");
        }

        router.push("/dashboard/posts");
      } catch (err) {
        console.error(err);
        toast.error("Unable to save post");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-4">
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
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Content</FieldLabel>
              <RichTextEditor
                key={editorResetKey}
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Your blog content here"
                invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Image (optional)</FieldLabel>
              <Input
                type="file"
                accept="image/*"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button disabled={isPending || !form.formState.isValid}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin size-4" />
              <span>Saving...</span>
            </>
          ) : (
            <span>{mode === "create" ? "Create Post" : "Update Post"}</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}