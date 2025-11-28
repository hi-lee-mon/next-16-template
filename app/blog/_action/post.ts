"use server";

import { revalidatePath } from "next/cache";
import { createPost } from "@/data/queries/posts";
import { postSchema } from "@/data/schema/post";
import type { PostActionResult } from "../_type/post";

export async function addPost(formData: FormData): Promise<PostActionResult> {
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
    slug: formData.get("slug"),
    publishedAt: formData.get("publishedAt")
      ? new Date(formData.get("publishedAt") as string)
      : undefined,
  };

  const parsed = postSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const error of parsed.error.errors) {
      const field = error.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(error.message);
    }

    return {
      success: false,
      error: {
        message: "入力内容に問題があります",
        details: fieldErrors,
      },
    };
  }

  try {
    const post = await createPost(parsed.data);
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return { success: true, data: post };
  } catch (error) {
    return {
      success: false,
      error: {
        message:
          error instanceof Error ? error.message : "投稿の作成に失敗しました",
      },
    };
  }
}
