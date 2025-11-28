import type { Product } from "@prisma/client";

export type { Product };

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | {
      success: false;
      error: { message: string; details?: Record<string, string[]> };
    };

export type ProductActionResult = ActionResult<Product>;

export const PRODUCT_CATEGORIES = [
  { value: "electronics", label: "電子機器" },
  { value: "clothing", label: "衣類" },
  { value: "food", label: "食品" },
  { value: "books", label: "書籍" },
  { value: "toys", label: "おもちゃ" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];
