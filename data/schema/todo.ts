import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内です"),
});

export const todoUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内です")
    .optional(),
  completed: z.boolean().optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;
export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>;
