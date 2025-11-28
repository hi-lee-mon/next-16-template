"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createProductAction } from "../_action/product";
import { PRODUCT_CATEGORIES } from "../_type/product";

export function ProductForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createProductAction(formData);

      if (result.success) {
        setOpen(false);
        setErrors({});
        toast({
          title: "商品を追加しました",
          description: `「${result.data?.name}」を追加しました`,
        });
      } else {
        if (result.error.details) {
          setErrors(result.error.details);
        } else {
          toast({
            variant: "destructive",
            title: "エラー",
            description: result.error.message,
          });
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>新しい商品を追加</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>新しい商品を追加</DialogTitle>
            <DialogDescription>
              商品の情報を入力してください。すべての項目は必須です。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">商品名</Label>
              <Input
                id="name"
                name="name"
                placeholder="商品名を入力"
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">価格 (円)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="0"
                disabled={isPending}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">カテゴリ</Label>
              <Select name="category" disabled={isPending}>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">在庫数</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                defaultValue="0"
                disabled={isPending}
              />
              {errors.stock && (
                <p className="text-sm text-destructive">{errors.stock[0]}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "追加中..." : "追加"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
