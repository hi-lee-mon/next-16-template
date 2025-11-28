import type { Post } from "@prisma/client";

export type { Post };

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | {
      success: false;
      error: { message: string; details?: Record<string, string[]> };
    };

export type PostActionResult = ActionResult<Post>;

export type PostSearchResult = {
  posts: Post[];
  total: number;
  query: string;
};
