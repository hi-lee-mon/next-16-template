import type { Todo } from "../_type/todo";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>TODOがありません</p>
        <p className="text-sm mt-1">
          上のフォームから新しいタスクを追加してください
        </p>
      </div>
    );
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>全{totalCount}件</span>
        <span>
          完了: {completedCount} / {totalCount}
        </span>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
