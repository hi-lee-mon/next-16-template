import type { User } from "../_type/user";
import { UserCard } from "./user-card";

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>ユーザーがいません</p>
        <p className="text-sm mt-1">
          上のフォームから新しいユーザーを作成してください
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        全{users.length}人のユーザー
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
