import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getPostBySlug } from "@/data/queries/posts";
import { PostContent } from "../_components/post-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません - Next.js Template",
    };
  }

  return {
    title: `${post.title} - Next.js Template`,
    description: post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog" className="gap-2">
            <span aria-hidden="true">&larr;</span>
            記事一覧に戻る
          </Link>
        </Button>
      </div>

      <PostContent post={post} />

      <footer className="mt-12 pt-8 border-t">
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link href="/blog">他の記事を読む</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            この記事は generateStaticParams を使用して静的に生成されています
          </p>
        </div>
      </footer>
    </div>
  );
}
