import Image from "next/image";

interface ProductImageProps {
  category: string;
  name: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  electronics: "/images/products/electronics.svg",
  clothing: "/images/products/clothing.svg",
  food: "/images/products/food.svg",
  books: "/images/products/books.svg",
  toys: "/images/products/toys.svg",
};

const CATEGORY_COLORS: Record<string, string> = {
  electronics: "bg-blue-100",
  clothing: "bg-purple-100",
  food: "bg-orange-100",
  books: "bg-green-100",
  toys: "bg-pink-100",
};

export function ProductImage({ category, name }: ProductImageProps) {
  const imageSrc = CATEGORY_IMAGES[category] ?? "/images/products/default.svg";
  const bgColor = CATEGORY_COLORS[category] ?? "bg-gray-100";

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-lg ${bgColor}`}
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-contain p-6"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={false}
      />
    </div>
  );
}
