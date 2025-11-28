"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Post } from "../_type/post";
import { PostCard } from "./post-card";

interface PostSearchProps {
  posts: Post[];
}

export function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    setIsSearching(true);

    const lowerQuery = query.toLowerCase();
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.author.toLowerCase().includes(lowerQuery),
    );

    setTimeout(() => setIsSearching(false), 0);

    return results;
  }, [query, posts]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          記事を検索（クライアントサイド）
        </Label>
        <Input
          id="search"
          type="search"
          placeholder="タイトル、内容、著者名で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <p className="text-xs text-muted-foreground">
          この検索はクライアントサイドで実行されます。Server
          Componentで取得したデータをフィルタリングしています。
        </p>
      </div>

      {query.trim() && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">検索結果</h3>
            {isSearching ? (
              <span className="text-sm text-muted-foreground">検索中...</span>
            ) : (
              <span className="text-sm text-muted-foreground">
                {filteredPosts.length}件の記事が見つかりました
              </span>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground rounded-lg border border-dashed">
              <p>「{query}」に一致する記事はありません</p>
              <p className="text-sm mt-1">
                別のキーワードで検索してみてください
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
