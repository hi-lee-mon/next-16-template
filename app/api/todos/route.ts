import { NextResponse } from "next/server";
import { createTodo, getTodos } from "@/data/queries/todos";
import { todoSchema } from "@/data/schema/todo";

export async function GET() {
  try {
    const todos = await getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json(
      { error: "タスクの取得に失敗しました" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = todoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "バリデーションエラー", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const todo = await createTodo(parsed.data);
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Failed to create todo:", error);
    return NextResponse.json(
      { error: "タスクの作成に失敗しました" },
      { status: 500 },
    );
  }
}
