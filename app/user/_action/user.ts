"use server";

import { revalidatePath } from "next/cache";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  updateUser,
} from "@/data/queries/users";
import { userSchema, userUpdateSchema } from "@/data/schema/user";
import type { UserActionResult } from "../_type/user";

export async function createUserAction(
  formData: FormData,
): Promise<UserActionResult> {
  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role") || "USER",
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
    const existingUser = await getUserByEmail(parsed.data.email);
    if (existingUser) {
      return {
        success: false,
        error: { message: "このメールアドレスは既に使用されています" },
      };
    }

    const user = await createUser(parsed.data);
    revalidatePath("/user");
    return { success: true, data: user };
  } catch (error) {
    console.error("Failed to create user:", error);
    return {
      success: false,
      error: { message: "ユーザーの作成に失敗しました" },
    };
  }
}

export async function updateUserAction(
  id: string,
  formData: FormData,
): Promise<UserActionResult> {
  const parsed = userUpdateSchema.safeParse({
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    role: formData.get("role") || undefined,
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
    if (parsed.data.email) {
      const existingUser = await getUserByEmail(parsed.data.email);
      if (existingUser && existingUser.id !== id) {
        return {
          success: false,
          error: { message: "このメールアドレスは既に使用されています" },
        };
      }
    }

    const user = await updateUser(id, parsed.data);
    revalidatePath("/user");
    return { success: true, data: user };
  } catch (error) {
    console.error("Failed to update user:", error);
    return {
      success: false,
      error: { message: "ユーザーの更新に失敗しました" },
    };
  }
}

export async function deleteUserAction(id: string): Promise<UserActionResult> {
  try {
    const user = await deleteUser(id);
    revalidatePath("/user");
    return { success: true, data: user };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return {
      success: false,
      error: { message: "ユーザーの削除に失敗しました" },
    };
  }
}
