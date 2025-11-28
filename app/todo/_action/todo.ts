"use server";

import { revalidatePath } from "next/cache";
import { createTodo, deleteTodo, toggleTodo } from "@/data/queries/todos";
import { todoSchema } from "@/data/schema/todo";
import type { TodoActionResult } from "../_type/todo";

export async function createTodoAction(
  formData: FormData,
): Promise<TodoActionResult> {
  const parsed = todoSchema.safeParse({
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: "バリデーションエラー",
        details: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  try {
    const todo = await createTodo(parsed.data);
    revalidatePath("/todo");
    return { success: true, data: todo };
  } catch (error) {
    console.error("Failed to create todo:", error);
    return {
      success: false,
      error: { message: "TODOの作成に失敗しました" },
    };
  }
}

export async function toggleTodoAction(id: string): Promise<TodoActionResult> {
  try {
    const todo = await toggleTodo(id);
    revalidatePath("/todo");
    return { success: true, data: todo };
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    return {
      success: false,
      error: { message: "TODOの更新に失敗しました" },
    };
  }
}

export async function deleteTodoAction(id: string): Promise<TodoActionResult> {
  try {
    const todo = await deleteTodo(id);
    revalidatePath("/todo");
    return { success: true, data: todo };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return {
      success: false,
      error: { message: "TODOの削除に失敗しました" },
    };
  }
}
