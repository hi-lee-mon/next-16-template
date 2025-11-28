"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { deleteUserAction } from "../_action/user";
import type { User } from "../_type/user";

interface UserCardProps {
  user: User;
}

const roleLabels: Record<string, string> = {
  ADMIN: "管理者",
  USER: "ユーザー",
  GUEST: "ゲスト",
};

const roleBadgeStyles: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  USER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  GUEST: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

export function UserCard({ user }: UserCardProps) {
  const [isDeleting, startDelete] = useTransition();

  const handleDelete = () => {
    if (confirm(`${user.name}を削除してもよろしいですか？`)) {
      startDelete(async () => {
        await deleteUserAction(user.id);
      });
    }
  };

  return (
    <Card className={cn("transition-opacity", isDeleting && "opacity-50")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg truncate">{user.name}</CardTitle>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0",
              roleBadgeStyles[user.role],
            )}
          >
            {roleLabels[user.role]}
          </span>
        </div>
        <CardDescription className="truncate">{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          作成日: {new Date(user.createdAt).toLocaleDateString("ja-JP")}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full"
        >
          {isDeleting ? "削除中..." : "削除"}
        </Button>
      </CardFooter>
    </Card>
  );
}
