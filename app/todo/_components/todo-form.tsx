"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTodoAction } from "../_action/todo";
import type { TodoActionResult } from "../_type/todo";

const initialState: TodoActionResult = {
  success: false,
  error: { message: "" },
};

function formAction(
  _prevState: TodoActionResult,
  formData: FormData,
): Promise<TodoActionResult> {
  return createTodoAction(formData);
}

export function TodoForm() {
  const [state, action, isPending] = useActionState(formAction, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <div className="flex gap-2">
          <Input
            id="title"
            name="title"
            placeholder="新しいタスクを入力..."
            required
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "追加中..." : "追加"}
          </Button>
        </div>
        {state.success === false && state.error.details?.title && (
          <p className="text-sm text-destructive">
            {state.error.details.title[0]}
          </p>
        )}
        {state.success === false &&
          state.error.message &&
          !state.error.details && (
            <p className="text-sm text-destructive">{state.error.message}</p>
          )}
      </div>
    </form>
  );
}
