
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  blogCreateSchema,
  type BlogCreateFormValues,
  type BlogCreateValues,
} from "@/app/lib/blog-validators"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import RichTextEditor from "@/components/rich-text-editor"
import { useRouter } from "next/navigation"
import ThumbnailUploader from "@/components/thumbnail-uploader"

export default function BlogForm({
  initial,
}: { initial?: Partial<BlogCreateFormValues> }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BlogCreateFormValues>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      title: initial?.title ?? "",
      content: initial?.content ?? "",
      excerpt: initial?.excerpt ?? "",
      tags: initial?.tags ?? [],
      categories: initial?.categories ?? [],
      isFeatured: initial?.isFeatured ?? false,
      thumbnailUrl: initial?.thumbnailUrl ?? null, 
    },
  })

 

  const content = watch("content")
  const thumbnailUrl = watch("thumbnailUrl")

  const onSubmit = async (values: BlogCreateFormValues) => {
    const payload: BlogCreateValues = blogCreateSchema.parse(values)
    console.log(values)
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      

      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to create post")
      }

      toast.success("Post created")
      router.push("/dashboard/blogs")
      router.refresh()
    } catch (e: any) {
      toast.error(e.message || "Error creating post")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Post title" {...register("title")} />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label>Thumbnail</Label>
        {/* keep the field in the form state */}
        <input type="hidden" {...register("thumbnailUrl")} />
        <ThumbnailUploader
          value={thumbnailUrl ?? null}
          onChange={(url) =>
            setValue("thumbnailUrl", url, { shouldValidate: true, shouldDirty: true })
          }
        />
        {errors.thumbnailUrl && (
          <p className="text-sm text-red-500">{errors.thumbnailUrl.message as string}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          value={content}
          onChange={(v) => setValue("content", v, { shouldValidate: true, shouldDirty: true })}
        />
        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
      </div>

      {/* Excerpt */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input id="excerpt" placeholder="Short summary" {...register("excerpt")} />
      </div>

      {/* Tags & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            placeholder="prisma, mongodb"
            onChange={(e) =>
              setValue(
                "tags",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                { shouldValidate: true, shouldDirty: true },
              )
            }
          />
        </div>
        <div>
          <Label htmlFor="categories">Categories (comma-separated)</Label>
          <Input
            id="categories"
            placeholder="engineering"
            onChange={(e) =>
              setValue(
                "categories",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                { shouldValidate: true, shouldDirty: true },
              )
            }
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input id="featured" type="checkbox" {...register("isFeatured")} />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Publish"}
      </Button>
    </form>
  )
}
