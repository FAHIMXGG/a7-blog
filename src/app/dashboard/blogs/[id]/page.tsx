import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import DeleteBlogButton from "@/components/DeleteBlogButton";

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

export default async function BlogView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;                // ✅ await params
  const post = await getPost(id);
  if (!post) return notFound();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/blogs/${post._id}/edit`}>Edit</Link>
          </Button>
          <DeleteBlogButton id={post._id} title={post.title} />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Tags: {(post.tags || []).join(", ")}
      </div>

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
