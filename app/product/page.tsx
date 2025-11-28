import { getProducts } from "@/data/queries/products";
import { ProductForm } from "./_components/product-form";
import { ProductList } from "./_components/product-list";

export const revalidate = 3600;

export const metadata = {
  title: "商品カタログ - Next.js Template",
  description:
    "商品カタログのサンプル実装 - ISRレンダリング、Dialog、Toastを使用したインタラクティブUI",
};

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">商品カタログ</h1>
            <p className="text-muted-foreground mt-2">
              ISRレンダリング（1時間ごとに再検証）を使用した商品カタログのサンプルです。
              Dialog、Toast、next/imageを使用したインタラクティブなUIを実装しています。
            </p>
          </div>
          <ProductForm />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">商品一覧</h2>
            <span className="text-sm text-muted-foreground">
              {products.length}件の商品
            </span>
          </div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
