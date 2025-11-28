import type { Post } from "../_type/post";

interface PostContentProps {
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

function parseMarkdown(content: string): string {
  const html = content
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>',
    )
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(
      /`(.*?)`/gim,
      '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>',
    )
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>');

  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("<li")) {
      if (!inList) {
        result.push('<ul class="my-4 space-y-1 list-disc">');
        inList = true;
      }
      result.push(line);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      if (line.trim() && !line.startsWith("<h")) {
        result.push(`<p class="my-4 leading-relaxed">${line}</p>`);
      } else {
        result.push(line);
      }
    }
  }

  if (inList) {
    result.push("</ul>");
  }

  return result.join("\n");
}

export function PostContent({ post }: PostContentProps) {
  const htmlContent = parseMarkdown(post.content);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8 pb-8 border-b">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="font-medium">{post.author}</span>
          <span>|</span>
          <time dateTime={post.publishedAt?.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </header>
      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown rendering requires dangerouslySetInnerHTML - content is sanitized by parseMarkdown
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
