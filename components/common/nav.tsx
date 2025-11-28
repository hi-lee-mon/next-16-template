"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/todo", label: "TODO" },
  { href: "/user", label: "ユーザー" },
  { href: "/product", label: "商品" },
  { href: "/blog", label: "ブログ" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? "text-zinc-900 dark:text-zinc-50"
              : "text-zinc-500 dark:text-zinc-400",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
