"use client"



import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "sonner"


export default function Providers({ children }: { children: ReactNode }) {
return (
<SessionProvider>
{children}
{/* shadcn toast system (used by react-hot-toast adapter below) */}
<Toaster />
</SessionProvider>
)
}