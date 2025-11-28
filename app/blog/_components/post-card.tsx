import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "../_type/post";

interface PostCardProps {
  post: Post;
}

function formatDate(date: Date | null): string {
  if (!date) return "未公開";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function truncateContent(content: string, maxLength = 100): string {
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength)}...`;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardDescription className="flex items-center justify-between">
            <span>{post.author}</span>
            <time dateTime={post.publishedAt?.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          </CardDescription>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {truncateContent(post.content)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
