import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });
  return (
    <div className="flex flex-wrap gap-4">
      {[...posts, ...posts, ...posts].map((image, index) => (
        <div key={image.id +"-"+ index} className="w-48 flex flex-col">
          <img src={image.url} alt="image" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}
export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in to view this page</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
