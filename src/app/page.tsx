import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://img.freepik.com/free-psd/technology-template-design_23-2150658252.jpg?w=2000&t=st=1713565592~exp=1713566192~hmac=c28398d967b1129300e0025c6193d6ce79582ec81b05a0a415ce744ac0c54251",
  "https://img.freepik.com/free-psd/influencer-youtube-thumbnail-template-design_23-2149586166.jpg?w=2000&t=st=1713565642~exp=1713566242~hmac=473ffb0f19c1ba95a3cccd0b18bbfd5cfd065eba7e39ee9906e859da5cc0beae",
  "https://img.freepik.com/free-psd/tech-store-business-youtube-cover-template_23-2149585279.jpg?w=2000&t=st=1713565648~exp=1713566248~hmac=c0d39761ec3fd99d3efcd626bb16fcdfdb4004014551a12cbab067b57d07ed5f",
  "https://img.freepik.com/free-psd/business-concept-youtube-cover-template_23-2150288667.jpg?w=2000&t=st=1713565664~exp=1713566264~hmac=d546d94377aea948b6ac866420cf382bf38ea2577330b92e32497a51f199e6e3"
];

const mockImages = mockUrls.map((url, index) => {
    return {
      id: index + 1,
      url
    }
});

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            {post.name}
          </div>
        ))}
        {
          [...mockImages, ...mockImages, ...mockImages].map((image, index) => (
            <div key={image.id +"-"+ index} className="w-48">
              <img src={image.url} alt="image" />
            </div>
          ))
        } 
      </div>
    </main>
  );
}
