import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteBlogButton from "@/components/DeleteBlogButton";

async function getPosts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();
  // Assume backend returns { success, data: Blog[] }
  return data?.data || [];
}

export default async function BlogsIndex() {
  const posts = await getPosts();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Posts</h1>
        <Button asChild>
          <Link href="/dashboard/blogs/new">Create Post</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-sm text-muted-foreground">No posts yet.</div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Tags</th>
                <th className="text-left p-2">Updated</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p: any) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2 font-medium">{p.title}</td>
                  <td className="p-2">{(p.tags || []).join(", ")}</td>
                  <td className="p-2">
                    {new Date(p.updatedAt || p.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="secondary" size="sm">
                        <Link href={`/dashboard/blogs/${p._id}`}>View</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/blogs/${p._id}/edit`}>Edit</Link>
                      </Button>

                      {/* Modal-confirm delete */}
                      <DeleteBlogButton id={p._id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
