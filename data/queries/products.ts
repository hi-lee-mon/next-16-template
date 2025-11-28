import type { Product } from "@prisma/client";
import { prisma } from "../db";
import type { ProductInput, ProductUpdateInput } from "../schema/product";

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(data: ProductInput): Promise<Product> {
  return prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock ?? 0,
    },
  });
}

export async function updateProduct(
  id: string,
  data: ProductUpdateInput,
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string): Promise<Product> {
  return prisma.product.delete({
    where: { id },
  });
}
