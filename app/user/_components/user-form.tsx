"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserAction } from "../_action/user";
import type { UserActionResult } from "../_type/user";

const initialState: UserActionResult = {
  success: false,
  error: { message: "" },
};

function formAction(
  _prevState: UserActionResult,
  formData: FormData,
): Promise<UserActionResult> {
  return createUserAction(formData);
}

export function UserForm() {
  const [state, action, isPending] = useActionState(formAction, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            name="name"
            placeholder="名前を入力..."
            required
            disabled={isPending}
          />
          {state.success === false && state.error.details?.name && (
            <p className="text-sm text-destructive">
              {state.error.details.name[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            required
            disabled={isPending}
          />
          {state.success === false && state.error.details?.email && (
            <p className="text-sm text-destructive">
              {state.error.details.email[0]}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">ロール</Label>
        <Select name="role" defaultValue="USER" disabled={isPending}>
          <SelectTrigger id="role">
            <SelectValue placeholder="ロールを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">管理者</SelectItem>
            <SelectItem value="USER">ユーザー</SelectItem>
            <SelectItem value="GUEST">ゲスト</SelectItem>
          </SelectContent>
        </Select>
        {state.success === false && state.error.details?.role && (
          <p className="text-sm text-destructive">
            {state.error.details.role[0]}
          </p>
        )}
      </div>
      {state.success === false &&
        state.error.message &&
        !state.error.details && (
          <p className="text-sm text-destructive">{state.error.message}</p>
        )}
      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "作成中..." : "ユーザーを作成"}
      </Button>
    </form>
  );
}
