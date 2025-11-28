"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { deleteProductAction } from "../_action/product";
import type { Product } from "../_type/product";
import { PRODUCT_CATEGORIES } from "../_type/product";
import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(price);
}

function getCategoryLabel(category: string): string {
  const cat = PRODUCT_CATEGORIES.find((c) => c.value === category);
  return cat?.label ?? category;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isDeleting, startDelete] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    startDelete(async () => {
      const result = await deleteProductAction(product.id);
      if (result.success) {
        toast({
          title: "商品を削除しました",
          description: `「${product.name}」を削除しました`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "エラー",
          description: result.error.message,
        });
      }
    });
  };

  return (
    <Card className={cn("transition-opacity", isDeleting && "opacity-50")}>
      <CardHeader className="pb-2">
        <ProductImage category={product.category} name={product.name} />
        <CardTitle className="text-lg mt-3">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">価格</span>
          <span className="font-semibold text-lg">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">カテゴリ</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {getCategoryLabel(product.category)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">在庫</span>
          <span
            className={cn(
              "font-medium",
              product.stock === 0
                ? "text-destructive"
                : product.stock < 10
                  ? "text-yellow-600"
                  : "text-green-600",
            )}
          >
            {product.stock === 0 ? "在庫切れ" : `${product.stock}個`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label={`${product.name}を削除`}
        >
          {isDeleting ? "削除中..." : "削除"}
        </Button>
      </CardFooter>
    </Card>
  );
}
