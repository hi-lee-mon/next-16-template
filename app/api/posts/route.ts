import { NextResponse } from "next/server";
import { createPost, getPublishedPosts } from "@/data/queries/posts";
import { postSchema } from "@/data/schema/post";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "記事の取得に失敗しました" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // publishedAtが文字列で渡された場合、Dateに変換
    const processedBody = {
      ...body,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
    };

    const parsed = postSchema.safeParse(processedBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "バリデーションエラー", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const post = await createPost(parsed.data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "記事の作成に失敗しました" },
      { status: 500 },
    );
  }
}
