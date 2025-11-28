import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "商品名は必須です")
    .max(100, "商品名は100文字以内です"),
  price: z.number().int().min(0, "価格は0以上である必要があります"),
  category: z.string().min(1, "カテゴリは必須です"),
  stock: z
    .number()
    .int()
    .min(0, "在庫数は0以上である必要があります")
    .optional()
    .default(0),
});

export const productUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  price: z.number().int().min(0).optional(),
  category: z.string().min(1).optional(),
  stock: z.number().int().min(0).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
