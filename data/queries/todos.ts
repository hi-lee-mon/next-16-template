import type { Todo } from "@prisma/client";
import { prisma } from "../db";
import type { TodoInput, TodoUpdateInput } from "../schema/todo";

export async function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTodoById(id: string): Promise<Todo | null> {
  return prisma.todo.findUnique({
    where: { id },
  });
}

export async function createTodo(data: TodoInput): Promise<Todo> {
  return prisma.todo.create({
    data: {
      title: data.title,
      completed: false,
    },
  });
}

export async function updateTodo(
  id: string,
  data: TodoUpdateInput,
): Promise<Todo> {
  return prisma.todo.update({
    where: { id },
    data,
  });
}

export async function toggleTodo(id: string): Promise<Todo> {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  return prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });
}

export async function deleteTodo(id: string): Promise<Todo> {
  return prisma.todo.delete({
    where: { id },
  });
}
