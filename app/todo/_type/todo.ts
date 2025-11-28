import type { Todo } from "@prisma/client";

export type { Todo };

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | {
      success: false;
      error: { message: string; details?: Record<string, string[]> };
    };

export type TodoActionResult = ActionResult<Todo>;
