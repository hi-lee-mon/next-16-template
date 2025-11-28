"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/data/queries/products";
import { productSchema, productUpdateSchema } from "@/data/schema/product";
import type { ProductActionResult } from "../_type/product";

export async function createProductAction(
  formData: FormData,
): Promise<ProductActionResult> {
  const priceValue = formData.get("price");
  const stockValue = formData.get("stock");

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: priceValue ? Number(priceValue) : undefined,
    category: formData.get("category"),
    stock: stockValue ? Number(stockValue) : 0,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: "バリデーションエラー",
        details: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  try {
    const product = await createProduct(parsed.data);
    revalidatePath("/product");
    return { success: true, data: product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      success: false,
      error: { message: "商品の作成に失敗しました" },
    };
  }
}

export async function updateProductAction(
  id: string,
  formData: FormData,
): Promise<ProductActionResult> {
  const priceValue = formData.get("price");
  const stockValue = formData.get("stock");

  const parsed = productUpdateSchema.safeParse({
    name: formData.get("name") || undefined,
    price: priceValue ? Number(priceValue) : undefined,
    category: formData.get("category") || undefined,
    stock: stockValue !== null ? Number(stockValue) : undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: "バリデーションエラー",
        details: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  try {
    const product = await updateProduct(id, parsed.data);
    revalidatePath("/product");
    return { success: true, data: product };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      success: false,
      error: { message: "商品の更新に失敗しました" },
    };
  }
}

export async function deleteProductAction(
  id: string,
): Promise<ProductActionResult> {
  try {
    const product = await deleteProduct(id);
    revalidatePath("/product");
    return { success: true, data: product };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return {
      success: false,
      error: { message: "商品の削除に失敗しました" },
    };
  }
}
