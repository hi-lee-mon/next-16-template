import { getPublishedPosts } from "@/data/queries/posts";
import { PostList } from "./_components/post-list";
import { PostSearch } from "./_components/post-search";

export const metadata = {
  title: "ブログ - Next.js Template",
  description:
    "ブログのサンプル実装 - 静的レンダリングとクライアントサイドデータフェッチングを使用",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ブログ</h1>
          <p className="text-muted-foreground mt-2">
            静的レンダリング（generateStaticParams）を使用したブログのサンプルです。
            記事一覧は静的に生成され、検索機能はクライアントサイドで実行されます。
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold">記事一覧</h2>
              <span className="text-sm text-muted-foreground">
                {posts.length}件の記事
              </span>
            </div>
            <PostSearch posts={posts} />
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">すべての記事</h2>
          <PostList posts={posts} />
        </section>
      </div>
    </div>
  );
}
