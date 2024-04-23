import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { posts } from "./db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getImages() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return posts;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!post) throw new Error("Post not found");

  // if (post.userId !== user.userId) throw new Error("Unauthorized");

  return post;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(posts).where(eq(posts.id, id));

  redirect("/");
}
