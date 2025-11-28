import type { Post } from "@prisma/client";
import { prisma } from "../db";
import type { PostInput, PostUpdateInput } from "../schema/post";

export async function getPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  return prisma.post.findUnique({
    where: { id },
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    select: { slug: true },
    where: { publishedAt: { not: null } },
  });
  return posts.map((post) => post.slug);
}

export async function createPost(data: PostInput): Promise<Post> {
  return prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      author: data.author,
      slug: data.slug,
      publishedAt: data.publishedAt ?? null,
    },
  });
}

export async function updatePost(
  id: string,
  data: PostUpdateInput,
): Promise<Post> {
  return prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletePost(id: string): Promise<Post> {
  return prisma.post.delete({
    where: { id },
  });
}
