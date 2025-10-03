// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // or remove if not using

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

function NavItems({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      {navLinks.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onClick}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === l.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session)
  const router = useRouter();

  const doLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast?.success?.("Signed out");
      router.push("/");
    } catch {
      toast?.error?.("Logout failed");
    }
  };

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <NavItems onClick={() => {}} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-semibold">myPortfolio</Link>
          <div className="hidden md:block">
            <NavItems />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.role === "admin" && (
                <Button asChild variant="secondary" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={doLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
