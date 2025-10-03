"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { blogUpdateSchema, type BlogUpdateValues } from "@/app/lib/blog-validators"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import RichTextEditor from "@/components/rich-text-editor"
import { useRouter } from "next/navigation"


export default function BlogEditForm({ post }: { post: any }) {
const router = useRouter()
const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<BlogUpdateValues>({
resolver: zodResolver(blogUpdateSchema),
defaultValues: {
title: post.title,
content: post.content,
excerpt: post.excerpt || "",
tags: post.tags || [],
categories: post.categories || [],
isFeatured: !!post.isFeatured,
},
})

const content = watch("content")


const onSubmit = async (values: BlogUpdateValues) => {
try {
const res = await fetch(`/api/blogs/${post._id}`, {
method: "PATCH",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(values),
})
const data = await res.json()
if (!res.ok || data?.success === false) throw new Error(data?.message || "Update failed")
toast.success("Updated")
router.push(`/dashboard/blogs/${post._id}`)
router.refresh()
} catch (e: any) {
toast.error(e.message || "Error updating")
}
}
return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div>
    <Label htmlFor="title">Title</Label>
    <Input id="title" {...register("title")} />
    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
    </div>
    
    
    <div className="space-y-2">
    <Label>Content</Label>
    <RichTextEditor value={content || ""} onChange={(v) => setValue("content", v, { shouldValidate: true })} />
    {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
    </div>
    
    
    <div>
    <Label htmlFor="excerpt">Excerpt</Label>
    <Input id="excerpt" {...register("excerpt")} />
    </div>
    
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
    <Label htmlFor="tags">Tags (comma-separated)</Label>
    <Input id="tags" defaultValue={(post.tags||[]).join(", ")} onChange={(e) => setValue("tags", e.target.value.split(",").map((s)=>s.trim()).filter(Boolean))} />
    </div>
    <div>
    <Label htmlFor="categories">Categories (comma-separated)</Label>
    <Input id="categories" defaultValue={(post.categories||[]).join(", ")} onChange={(e) => setValue("categories", e.target.value.split(",").map((s)=>s.trim()).filter(Boolean))} />
    </div>
    </div>
    
    
    <div className="flex items-center gap-2">
    <input id="featured" type="checkbox" {...register("isFeatured")} />
    <Label htmlFor="featured">Featured</Label>
    </div>
    
    
    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Save changes"}</Button>
    </form>
    )
    }