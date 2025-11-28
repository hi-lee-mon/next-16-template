import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(200, "タイトルは200文字以内です"),
  content: z.string().min(1, "本文は必須です"),
  author: z
    .string()
    .min(1, "著者名は必須です")
    .max(50, "著者名は50文字以内です"),
  slug: z
    .string()
    .min(1, "スラッグは必須です")
    .regex(
      /^[a-z0-9-]+$/,
      "スラッグは英小文字、数字、ハイフンのみ使用可能です",
    ),
  publishedAt: z.date().optional(),
});

export const postUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  author: z.string().min(1).max(50).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  publishedAt: z.date().optional().nullable(),
});

export type PostInput = z.infer<typeof postSchema>;
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;
