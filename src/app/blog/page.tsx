// app/blog/page.tsx
import Link from "next/link"
import Image from "next/image"

export const revalidate = 60 // ISR every 60s

// Local UI types (optional: move to "@/types/blog")
type BlogItem = {
  _id: string
  title: string
  content: string
  excerpt?: string | null
  tags?: string[]
  categories?: string[]
  isFeatured?: boolean
  thumbnailUrl?: string | null
  views?: number
  createdAt?: string
  updatedAt?: string
}

type BlogListResponse = {
  success: boolean
  message?: string
  data: BlogItem[]
  meta?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export const metadata = {
  title: "Blog",
  description: "All posts and updates",
}

async function getBlogs(page: number, limit = 9): Promise<BlogListResponse> {
  const url = `${process.env.BACKEND_URL}/api/blogs?page=${page}&limit=${limit}`
  const res = await fetch(url, { next: { revalidate } })
  if (!res.ok) throw new Error(`Failed to fetch blogs (HTTP ${res.status})`)
  return res.json() as Promise<BlogListResponse>
}

export default async function PublicBlogIndex({
  // NOTE: searchParams is a Promise on newer Next.js
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const sp = await searchParams
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page
  const pageNum = Number.parseInt(pageParam ?? "1", 10)
  const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1

  const limit = 9
  const { data: posts, meta } = await getBlogs(page, limit)

  const currentPage = meta?.page ?? page
  const totalPages = meta?.pages ?? 1
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <section className="space-y-6">
      <header className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">All Blogs</h1>
        {meta && (
          <p className="text-xs text-muted-foreground">
            Showing page {currentPage} of {totalPages}
          </p>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: BlogItem) => (
            <li key={p._id} className="group rounded-xl border overflow-hidden">
              <Link href={`/blog/${p._id}`} className="block">
                <div className="aspect-video relative bg-muted">
                  {p.thumbnailUrl ? (
                    <Image
                      src={p.thumbnailUrl}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      priority={currentPage === 1}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h2 className="text-base font-semibold line-clamp-2">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {p.excerpt}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span className="truncate">
                      {(p.tags ?? []).join(", ")}
                    </span>
                    <span>{p.views ?? 0} views</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-between pt-2">
          <Link
            href={`/blog${hasPrev ? `?page=${currentPage - 1}` : ""}`}
            aria-disabled={!hasPrev}
            className={`rounded-md border px-3 py-1 text-sm ${
              hasPrev ? "hover:bg-muted" : "pointer-events-none opacity-50"
            }`}
          >
            ← Previous
          </Link>

          <div className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>

          <Link
            href={`/blog${hasNext ? `?page=${currentPage + 1}` : ""}`}
            aria-disabled={!hasNext}
            className={`rounded-md border px-3 py-1 text-sm ${
              hasNext ? "hover:bg-muted" : "pointer-events-none opacity-50"
            }`}
          >
            Next →
          </Link>
        </nav>
      )}
    </section>
  )
}
