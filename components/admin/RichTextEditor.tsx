"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRef } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Helper: sync a resize-container's flex alignment from an img's alignment ──
function applyContainerAlignment(
  container: HTMLElement,
  alignment: string,
) {
  container.style.width = "100%";
  container.style.display = "flex";
  container.style.justifyContent =
    alignment === "center"
      ? "center"
      : alignment === "right"
        ? "flex-end"
        : "flex-start";
}

// ── Helper: sync an <img>'s data-align + style from a ProseMirror node ────────
function applyImgAlignment(img: HTMLElement, alignment: string) {
  img.setAttribute("data-align", alignment);
  img.style.display = "block";
  img.style.maxWidth = "100%";
  img.style.height = "auto";
  img.style.marginLeft =
    alignment === "center" || alignment === "right" ? "auto" : "0";
  img.style.marginRight =
    alignment === "center" || alignment === "left" ? "auto" : "0";
}

// ── Custom Image extension with alignment + proper NodeView DOM sync ──────────
const EditorImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alignment: {
        default: "left",
        parseHTML: (element) => element.getAttribute("data-align") ?? "left",
        renderHTML: ({ alignment }) => {
          const a = alignment ?? "left";
          return {
            "data-align": a,
            style: [
              "display:block",
              "max-width:100%",
              "height:auto",
              `margin-left:${a === "center" || a === "right" ? "auto" : "0"}`,
              `margin-right:${a === "center" || a === "left" ? "auto" : "0"}`,
            ].join(";"),
          };
        },
      },
    };
  },

  addNodeView() {
    // Get the parent Image extension's NodeView factory (handles resize)
    const parentFactory = this.parent?.();
    if (!parentFactory) return null;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return (props) => {
      // Create the ResizableNodeView via the parent factory
      const nodeView = parentFactory(props);

      // Patch the update method to sync alignment attributes to the DOM,
      // because ResizableNodeView doesn't re-render custom attributes.
      const origUpdate = nodeView.update?.bind(nodeView);
      nodeView.update = (
        node: Parameters<NonNullable<typeof origUpdate>>[0],
        decorations: Parameters<NonNullable<typeof origUpdate>>[1],
        innerDecorations: Parameters<NonNullable<typeof origUpdate>>[2],
      ) => {
        const result = origUpdate
          ? origUpdate(node, decorations, innerDecorations)
          : true;

        if (result !== false && nodeView.dom instanceof HTMLElement) {
          const alignment =
            (node.attrs as Record<string, unknown>).alignment as string ??
            "left";
          const img = nodeView.dom.querySelector("img");
          if (img) applyImgAlignment(img, alignment);
          applyContainerAlignment(nodeView.dom, alignment);
        }

        return result;
      };

      // Apply initial container alignment (the parent factory doesn't do this)
      if (nodeView.dom instanceof HTMLElement) {
        const alignment =
          (props.node.attrs as Record<string, unknown>).alignment as string ??
          "left";
        applyContainerAlignment(nodeView.dom, alignment);
      }

      return nodeView;
    };
  },
});

// ── Toolbar button — outside the component so React identity is stable ────────
function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "p-1.5 rounded hover:bg-muted transition-colors",
        active && "bg-muted text-primary",
      )}
    >
      {children}
    </button>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  invalid?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here…",
  invalid,
}: RichTextEditorProps) {
  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);
  const convex = useConvex();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      EditorImage.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { style: "max-width:100%;height:auto;" },
        resize: {
          enabled: true,
          directions: ["top-left", "top-right", "bottom-left", "bottom-right"],
          minWidth: 80,
          minHeight: 80,
          alwaysPreserveAspectRatio: true,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none min-h-[240px] px-4 py-3 focus:outline-none",
      },
    },
  });

  const handleImageUpload = async (file: File) => {
    if (!editor) return;
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) throw new Error("Upload failed");
      const { storageId } = (await result.json()) as {
        storageId: Id<"_storage">;
      };
      const url = await convex.query(api.posts.getStorageUrl, { storageId });
      if (!url) throw new Error("Could not resolve storage URL");
      editor
        .chain()
        .focus()
        .setImage({ src: url, alt: file.name, width: 300, height: 200 })
        .run();
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const setImageAlign = (alignment: "left" | "center" | "right") => {
    if (!editor) return;
    editor.chain().focus().updateAttributes("image", { alignment }).run();
  };

  const setAlign = (alignment: "left" | "center" | "right") => {
    if (!editor) return;
    if (editor.isActive("image")) {
      setImageAlign(alignment);
    } else {
      editor.chain().focus().setTextAlign(alignment).run();
    }
  };

  if (!editor) return null;

  const imgActive = editor.isActive("image");
  const imgAlign = editor.getAttributes("image").alignment as
    | string
    | undefined;

  return (
    <div
      className={cn(
        "rounded-md border bg-background",
        invalid && "border-destructive",
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5">
        <ToolbarBtn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </ToolbarBtn>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarBtn
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="size-4" />
        </ToolbarBtn>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarBtn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="size-4" />
        </ToolbarBtn>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarBtn
          title="Insert image"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Align left"
          active={
            imgActive
              ? imgAlign === "left"
              : editor.isActive({ textAlign: "left" })
          }
          onClick={() => setAlign("left")}
        >
          <AlignLeft className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Align center"
          active={
            imgActive
              ? imgAlign === "center"
              : editor.isActive({ textAlign: "center" })
          }
          onClick={() => setAlign("center")}
        >
          <AlignCenter className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Align right"
          active={
            imgActive
              ? imgAlign === "right"
              : editor.isActive({ textAlign: "right" })
          }
          onClick={() => setAlign("right")}
        >
          <AlignRight className="size-4" />
        </ToolbarBtn>
      </div>

      <EditorContent editor={editor} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleImageUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
