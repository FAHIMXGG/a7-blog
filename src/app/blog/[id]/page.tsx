// app/blog/[id]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { BlogDetail } from "@/types/blog"

export const revalidate = 60

async function getPost(id: string): Promise<BlogDetail | null> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/blogs/${id}`, {
    next: { revalidate },
  })
  if (!res.ok) return null
  const json = (await res.json()) as { data?: BlogDetail }
  return json.data ?? null
}

export async function generateMetadata(
  { params }: { params: Promise<{ id?: string | string[] }> }
): Promise<Metadata> {
  const p = await params
  const id = Array.isArray(p.id) ? p.id[0] : p.id
  if (!id) return { title: "Post", description: "Blog post" }

  const post = await getPost(id)
  if (!post) return { title: "Post", description: "Blog post" }

  return {
    title: post.title,
    description: post.excerpt ?? "Blog post",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      images: post.thumbnailUrl ? [{ url: post.thumbnailUrl }] : undefined,
    },
  }
}

export default async function PublicPostPage(
  { params }: { params: Promise<{ id?: string | string[] }> }
) {
  const p = await params
  const id = Array.isArray(p.id) ? p.id[0] : p.id
  if (!id) notFound()

  const post = await getPost(id)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
      {/* Go Back button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
        >
          ← Go Back
        </Link>
      </div>

      {post.thumbnailUrl && (
        <div className="relative aspect-[16/9] w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
      )}

      <h1>{post.title}</h1>
      {post.excerpt && <p className="lead">{post.excerpt}</p>}

      {/* Make sure content is sanitized server-side */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {(post.author || post.views !== undefined) && (
        <div className="mt-8 text-sm text-muted-foreground">
          {post.author && (
            <>
              Written by <b>{post.author.name}</b>
              {post.author.role ? <> ({post.author.role})</> : null}
            </>
          )}
          {post.views !== undefined ? (
            <>
              {post.author ? " | " : null}
              Views: {post.views ?? 0}
            </>
          ) : null}
        </div>
      )}
    </article>
  )
}
