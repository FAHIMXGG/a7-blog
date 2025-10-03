"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues, // INPUT (role?:)
  type RegisterData,       // OUTPUT (role required)
} from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "user" }, // good to keep
  });

  // Accept INPUT type, then parse to OUTPUT
  const onSubmit = async (values: RegisterFormValues) => {
    const payload: RegisterData = registerSchema.parse(values); // now role is guaranteed

    try {
      const res = await fetch("/api/proxy/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Registration failed");
      }
      toast.success("Registered successfully! Please log in.");
      router.push("/login");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        {/* keep hidden if you don't want users to change it */}
        <input type="hidden" {...register("role")} value="user" />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating…" : "Register"}
        </Button>
      </form>
    </div>
  );
}
