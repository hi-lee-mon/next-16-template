import { NextResponse } from "next/server";
import { getPostBySlug } from "@/data/queries/posts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: "記事が見つかりません" },
        { status: 404 },
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "記事の取得に失敗しました" },
      { status: 500 },
    );
  }
}
