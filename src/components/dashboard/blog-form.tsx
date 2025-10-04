"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  blogCreateSchema,
  type BlogCreateFormValues,
  type BlogCreateValues,
} from "@/app/lib/blog-validators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/rich-text-editor";
import { useRouter } from "next/navigation";
import ThumbnailUploader from "@/components/thumbnail-uploader";

export default function BlogForm({
  initial,
}: {
  initial?: Partial<BlogCreateFormValues>;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<BlogCreateFormValues>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      title: initial?.title ?? "",
      content: initial?.content ?? "",
      excerpt: initial?.excerpt ?? "",
      thumbnailUrl: (initial?.thumbnailUrl as string | undefined) ?? "",
      isFeatured: initial?.isFeatured ?? false,
      // tags optional
      tags: initial?.tags ?? [],
      // categories REQUIRED by schema; start empty so error shows until user types
      categories: initial?.categories ?? [],
    },
  });

  const onSubmit = async (values: BlogCreateFormValues) => {
    const payload: BlogCreateValues = blogCreateSchema.parse(values);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to create post");
      }
      toast.success("Post created");
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error creating post";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title (required) */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Post title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Thumbnail (required) */}
      <div className="space-y-2">
        <Label>Thumbnail (URL)</Label>
        {/* keep field in form state as STRING */}
        <input type="hidden" {...register("thumbnailUrl")} />
        <Controller
          name="thumbnailUrl"
          control={control}
          render={({ field }) => (
            <ThumbnailUploader
              value={field.value || ""}
              onChange={(url) =>
                field.onChange(url ?? "") // never null
              }
            />
          )}
        />
        {errors.thumbnailUrl && (
          <p className="text-sm text-red-500">
            {errors.thumbnailUrl.message as string}
          </p>
        )}
      </div>

      {/* Content (required, HTML-aware) */}
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

      {/* Excerpt (required) */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input
          id="excerpt"
          placeholder="Short summary"
          {...register("excerpt")}
        />
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
            placeholder="prisma, mongodb"
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
            placeholder="engineering"
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

      {/* Featured (required boolean in schema, UI default provided) */}
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
        {isSubmitting ? "Saving…" : "Publish"}
      </Button>
    </form>
  );
}
