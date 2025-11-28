import type { Role, User } from "@prisma/client";

export type { User, Role };

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | {
      success: false;
      error: { message: string; details?: Record<string, string[]> };
    };

export type UserActionResult = ActionResult<User>;
