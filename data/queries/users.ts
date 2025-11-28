import type { User } from "@prisma/client";
import { prisma } from "../db";
import type { UserInput, UserUpdateInput } from "../schema/user";

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: UserInput): Promise<User> {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role ?? "USER",
    },
  });
}

export async function updateUser(
  id: string,
  data: UserUpdateInput,
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}
