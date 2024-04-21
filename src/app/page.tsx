import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });
  
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
          [...posts, ...posts, ...posts].map((image, index) => (
            <div key={image.id +"-"+ index} className="w-48 flex flex-col">
              <img src={image.url} alt="image" />
              <div>{image.name}</div>
            </div>
          ))
        } 
      </div>
    </main>
  );
}
