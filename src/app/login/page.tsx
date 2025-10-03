"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginInput } from "@/app/lib/validators"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"


export default function LoginPage() {
const router = useRouter()
const {
register,
handleSubmit,
formState: { errors, isSubmitting },
} = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })


const onSubmit = async (values: LoginInput) => {
const res = await signIn("credentials", {
email: values.email,
password: values.password,
redirect: false,
})


if (res?.ok) {
toast.success("Logged in successfully")
router.push("/dashboard")
} else {
toast.error(res?.error || "Invalid credentials")
}
}


return (
<div className="max-w-md mx-auto space-y-4">
<h1 className="text-xl font-semibold">Sign in</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
<div>
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
</div>
<div>
<Label htmlFor="password">Password</Label>
<Input id="password" type="password" {...register("password")} />
{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
</div>
<Button type="submit" disabled={isSubmitting} className="w-full">
{isSubmitting ? "Signing in…" : "Sign in"}
</Button>
</form>
</div>
)
}