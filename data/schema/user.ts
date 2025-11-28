import { z } from "zod";

export const roleEnum = z.enum(["ADMIN", "USER", "GUEST"]);

export const userSchema = z.object({
  name: z.string().min(1, "名前は必須です").max(50, "名前は50文字以内です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  role: roleEnum.optional().default("USER"),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  email: z.string().email().optional(),
  role: roleEnum.optional(),
});

export type Role = z.infer<typeof roleEnum>;
export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
