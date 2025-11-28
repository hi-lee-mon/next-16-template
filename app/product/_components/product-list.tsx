import type { Product } from "../_type/product";
import { ProductCard } from "./product-card";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>商品がありません</p>
        <p className="text-sm mt-1">
          上のボタンから新しい商品を追加してください
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
