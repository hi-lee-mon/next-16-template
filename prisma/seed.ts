import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.post.deleteMany();

  // Seed Todos
  const todos = await prisma.todo.createMany({
    data: [
      { title: "Next.jsの基本を学ぶ", completed: true },
      { title: "Server Actionsを実装する", completed: true },
      { title: "Prismaでデータベースを操作する", completed: false },
      { title: "Tailwind CSSでスタイリングする", completed: false },
      { title: "本番環境にデプロイする", completed: false },
    ],
  });
  console.log(`Created ${todos.count} todos`);

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { name: "管理者 太郎", email: "admin@example.com", role: "ADMIN" },
      { name: "一般 花子", email: "user@example.com", role: "USER" },
      { name: "ゲスト 次郎", email: "guest@example.com", role: "GUEST" },
    ],
  });
  console.log(`Created ${users.count} users`);

  // Seed Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "ワイヤレスイヤホン",
        price: 12800,
        category: "電子機器",
        stock: 50,
      },
      {
        name: "スマートウォッチ",
        price: 29800,
        category: "電子機器",
        stock: 30,
      },
      { name: "コットンTシャツ", price: 2980, category: "衣類", stock: 100 },
      { name: "デニムジーンズ", price: 7980, category: "衣類", stock: 45 },
      {
        name: "オーガニックコーヒー豆",
        price: 1500,
        category: "食品",
        stock: 200,
      },
      { name: "抹茶パウダー", price: 980, category: "食品", stock: 150 },
    ],
  });
  console.log(`Created ${products.count} products`);

  // Seed Posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "Next.js 16の新機能について",
        content: `# Next.js 16の新機能

Next.js 16では多くの新機能が追加されました。

## 主な変更点

- React 19のサポート
- 改善されたServer Actions
- より高速なビルド時間

詳細については公式ドキュメントをご覧ください。`,
        author: "田中 一郎",
        slug: "nextjs-16-new-features",
        publishedAt: new Date("2024-11-01"),
      },
      {
        title: "Prismaを使ったデータベース設計",
        content: `# Prismaを使ったデータベース設計

Prismaは現代的なNode.js/TypeScript向けORMです。

## 特徴

- 型安全なデータベースクライアント
- 直感的なスキーマ定義
- 自動マイグレーション

実際のプロジェクトでの活用方法を解説します。`,
        author: "鈴木 花子",
        slug: "prisma-database-design",
        publishedAt: new Date("2024-10-15"),
      },
      {
        title: "Server ActionsでフォームをSubmit",
        content: `# Server ActionsでフォームをSubmit

Server Actionsを使うと、クライアントサイドのJavaScriptなしでフォームを送信できます。

## メリット

- JavaScriptが無効でも動作
- より安全なデータ送信
- シンプルなコード

実装例を見ていきましょう。`,
        author: "佐藤 太郎",
        slug: "server-actions-form-submit",
        publishedAt: new Date("2024-09-20"),
      },
    ],
  });
  console.log(`Created ${posts.count} posts`);

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
