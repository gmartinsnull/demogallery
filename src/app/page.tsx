import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const posts = await getImages();
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {posts.map((image, index) => (
        <div key={image.id + "-" + index} className="flex h-48 w-48 flex-col">
          <Link href={`/photos/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              alt={image.name}
              width={200}
              height={200}
            />
          </Link>
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
        <div className="h-full w-full text-center text-2xl">
          Please sign in to view this page
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
