export const SITE_NAME = "Next.js Template";
export const SITE_DESCRIPTION = "Next.js 16テンプレート - サンプル実装付き";

export const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/todo", label: "TODO" },
  { href: "/user", label: "ユーザー" },
  { href: "/product", label: "商品" },
  { href: "/blog", label: "ブログ" },
] as const;

export const PRODUCT_CATEGORIES = ["電子機器", "衣類", "食品"] as const;

export const USER_ROLES = ["ADMIN", "USER", "GUEST"] as const;
