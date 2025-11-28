import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "TODO管理",
    description:
      "Server Actionsを使用したTODOリストのCRUD操作を体験できます。動的レンダリングのサンプルです。",
    href: "/todo",
    icon: "✓",
    rendering: "Dynamic",
  },
  {
    title: "ユーザー管理",
    description:
      "ユーザーの追加・編集・削除機能をServer Actionsで実装。フォームバリデーションの例も含みます。",
    href: "/user",
    icon: "👤",
    rendering: "Dynamic",
  },
  {
    title: "商品カタログ",
    description:
      "ISR（Incremental Static Regeneration）を使用した商品一覧。ダイアログやトーストなどのUIコンポーネント例も含みます。",
    href: "/product",
    icon: "🛍️",
    rendering: "ISR (1時間)",
  },
  {
    title: "ブログ",
    description:
      "静的生成（Static Generation）によるブログ記事一覧と詳細ページ。generateStaticParamsの使用例です。",
    href: "/blog",
    icon: "📝",
    rendering: "Static",
  },
];

const apiEndpoints = [
  { path: "/api/todos", methods: "GET, POST", description: "TODOのCRUD操作" },
  { path: "/api/users", methods: "GET, POST", description: "ユーザー管理" },
  { path: "/api/products", methods: "GET, POST", description: "商品カタログ" },
  { path: "/api/posts", methods: "GET, POST", description: "ブログ記事" },
  { path: "/api/posts/[slug]", methods: "GET", description: "記事詳細取得" },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Next.js 16 テンプレート
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          サンプル実装付きのNext.js
          16テンプレートです。各種パターンを確認できます。
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          サンプルページ
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href} className="group">
              <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                <CardHeader>
                  <div className="mb-2 text-3xl">{feature.icon}</div>
                  <CardTitle className="flex items-center justify-between">
                    {feature.title}
                    <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      {feature.rendering}
                    </span>
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50">
                    {feature.href} →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          APIエンドポイント
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">
                      パス
                    </th>
                    <th className="pb-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">
                      メソッド
                    </th>
                    <th className="pb-3 font-medium text-zinc-900 dark:text-zinc-50">
                      説明
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((endpoint) => (
                    <tr
                      key={endpoint.path}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="py-3 pr-4">
                        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                          {endpoint.path}
                        </code>
                      </td>
                      <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                        {endpoint.methods}
                      </td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-400">
                        {endpoint.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          技術スタック
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Next.js 16", description: "App Router / Server Actions" },
            { name: "React 19", description: "Server Components" },
            { name: "TypeScript 5+", description: "厳密モード" },
            { name: "Tailwind CSS 4", description: "ユーティリティファースト" },
            { name: "Prisma", description: "PostgreSQL ORM" },
            { name: "shadcn/ui", description: "UIコンポーネント" },
          ].map((tech) => (
            <Card key={tech.name} className="p-4">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {tech.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {tech.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
