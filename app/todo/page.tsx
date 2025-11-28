import { getTodos } from "@/data/queries/todos";
import { TodoForm } from "./_components/todo-form";
import { TodoList } from "./_components/todo-list";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TODO - Next.js Template",
  description: "TODOリストのサンプル実装 - Server Actionsを使用したCRUD操作",
};

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">TODO</h1>
          <p className="text-muted-foreground mt-2">
            Server Actionsを使用したTODOリストのサンプルです。
            タスクの追加、完了/未完了の切り替え、削除ができます。
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">新しいタスクを追加</h2>
          <TodoForm />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">タスク一覧</h2>
          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );
}
