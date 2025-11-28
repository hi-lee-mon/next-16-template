import { getUsers } from "@/data/queries/users";
import { UserForm } from "./_components/user-form";
import { UserList } from "./_components/user-list";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ユーザー管理 - Next.js Template",
  description: "ユーザー管理のサンプル実装 - Server Actionsを使用したCRUD操作",
};

export default async function UserPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ユーザー管理</h1>
          <p className="text-muted-foreground mt-2">
            Server Actionsを使用したユーザー管理のサンプルです。
            ユーザーの作成、削除ができます。ロール（管理者/ユーザー/ゲスト）を設定できます。
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">新しいユーザーを作成</h2>
          <UserForm />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">ユーザー一覧</h2>
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}
