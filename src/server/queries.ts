import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { posts } from "./db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { analyticsServerClient } from "./analytics";
import { ratelimit } from "./ratelimit";
import posthog from "posthog-js";

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
  const { success } = await ratelimit.limit(user.userId);
  if (!success) {
    posthog.capture("refresh_post_failed");
    // toast.error("Refresh post failed");
    throw new Error("Ratelimited");
  }

  return post;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(posts).where(eq(posts.id, id));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete_image",
    properties: {
      postId: id,
    },
  });

  redirect("/");
}
