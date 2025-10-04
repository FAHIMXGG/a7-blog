"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  blogCreateSchema,            // use create schema to enforce required rules
  type BlogCreateFormValues,
  type BlogCreateValues,
  type BlogUpdateValues,       // still send partial on PATCH
} from "@/app/lib/blog-validators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/rich-text-editor";
import { useRouter } from "next/navigation";
import ThumbnailUploader from "@/components/thumbnail-uploader";

// Minimal shape you actually use here
type Post = {
  _id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  thumbnailUrl?: string | null;
};

export default function BlogEditForm({ post }: { post: Post }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<BlogCreateFormValues>({
    // IMPORTANT: use blogCreateSchema so content/categories are required with messages
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      title: post.title ?? "",
      content: post.content ?? "",
      excerpt: post.excerpt ?? "",
      // never null — keep as string
      thumbnailUrl: post.thumbnailUrl ?? "",
      isFeatured: Boolean(post.isFeatured),
      // tags optional
      tags: post.tags ?? [],
      // categories REQUIRED by schema — start with existing or empty (shows error if user clears)
      categories: post.categories ?? [],
    },
  });

  const onSubmit = async (values: BlogCreateFormValues) => {
    // We validated against the create schema; now transform to a PATCH-friendly payload.
    const full: BlogCreateValues = blogCreateSchema.parse(values);

    // If you prefer to only send the fields you allow updating, pick them here:
    const payload: BlogUpdateValues = {
      title: full.title,
      content: full.content,
      excerpt: full.excerpt,
      thumbnailUrl: full.thumbnailUrl,
      isFeatured: full.isFeatured,
      tags: full.tags,                 // optional
      categories: full.categories,     // required
    };

    try {
      const res = await fetch(`/api/blogs/${post._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Update failed");
      }
      toast.success("Updated");
      router.push(`/dashboard/blogs/${post._id}`);
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error updating";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Thumbnail (string URL; never null) */}
      <div className="space-y-2">
        <Label>Thumbnail (URL)</Label>
        <Controller
          name="thumbnailUrl"
          control={control}
          render={({ field }) => (
            <ThumbnailUploader
              value={field.value || ""}
              onChange={(url) => field.onChange(url ?? "")}
            />
          )}
        />
        {errors.thumbnailUrl && (
          <p className="text-sm text-red-500">
            {errors.thumbnailUrl.message as string}
          </p>
        )}
      </div>

      {/* Content (required, HTML-aware via schema) */}
      <div className="space-y-2">
        <Label>Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input id="excerpt" {...register("excerpt")} />
        {errors.excerpt && (
          <p className="text-sm text-red-500">{errors.excerpt.message}</p>
        )}
      </div>

      {/* Tags (optional) & Categories (required) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            defaultValue={(post.tags ?? []).join(", ")}
            onChange={(e) =>
              setValue(
                "tags",
                e.currentTarget.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
                { shouldValidate: true, shouldDirty: true }
              )
            }
          />
          {errors.tags && (
            <p className="text-sm text-red-500">
              {String(errors.tags.message)}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="categories">Categories (comma-separated)</Label>
          <Input
            id="categories"
            defaultValue={(post.categories ?? []).join(", ")}
            onChange={(e) =>
              setValue(
                "categories",
                e.currentTarget.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
                { shouldValidate: true, shouldDirty: true }
              )
            }
          />
          {errors.categories && (
            <p className="text-sm text-red-500">
              {String(errors.categories.message)}
            </p>
          )}
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input id="featured" type="checkbox" {...register("isFeatured")} />
        <Label htmlFor="featured">Featured</Label>
        {errors.isFeatured && (
          <p className="text-sm text-red-500">
            {String(errors.isFeatured.message)}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
