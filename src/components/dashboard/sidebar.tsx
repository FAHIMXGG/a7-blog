"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


const items = [
{ href: "/dashboard", label: "Overview" },
{ href: "/dashboard/blogs", label: "All Posts" },
{ href: "/dashboard/blogs/new", label: "Create Post" },
]


export default function Sidebar() {
const pathname = usePathname()
return (
<nav className="rounded-xl border p-4">
<h3 className="font-semibold mb-3">Admin</h3>
<ul className="space-y-1">
{items.map((i) => (
<li key={i.href}>
<Link
href={i.href}
className={cn(
"block rounded px-3 py-2 text-sm hover:bg-muted",
pathname === i.href ? "bg-muted font-medium" : ""
)}
>
{i.label}
</Link>
</li>
))}
</ul>
</nav>
)
}