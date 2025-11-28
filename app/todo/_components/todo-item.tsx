"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteTodoAction, toggleTodoAction } from "../_action/todo";
import type { Todo } from "../_type/todo";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isToggling, startToggle] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  const handleToggle = () => {
    startToggle(async () => {
      await toggleTodoAction(todo.id);
    });
  };

  const handleDelete = () => {
    startDelete(async () => {
      await deleteTodoAction(todo.id);
    });
  };

  const isPending = isToggling || isDeleting;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border p-4 transition-opacity",
        isPending && "opacity-50",
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isPending}
          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          aria-label={`${todo.title}を${todo.completed ? "未完了" : "完了"}にする`}
        />
        <span
          className={cn(
            "truncate",
            todo.completed && "text-muted-foreground line-through",
          )}
        >
          {todo.title}
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        aria-label={`${todo.title}を削除`}
      >
        {isDeleting ? "削除中..." : "削除"}
      </Button>
    </div>
  );
}
