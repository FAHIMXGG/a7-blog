import { z } from "zod";

export const blogCreateSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content is too short"),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});

export const blogUpdateSchema = blogCreateSchema.partial().extend({
  title: z.string().min(3).optional(),
});

// INPUT = before defaults applied (isFeatured? optional)
export type BlogCreateFormValues = z.input<typeof blogCreateSchema>;

// OUTPUT = after parsing (isFeatured always boolean)
export type BlogCreateValues = z.output<typeof blogCreateSchema>;

export type BlogUpdateValues = z.infer<typeof blogUpdateSchema>;
