import Image from "next/image";
import client from "../../lib/contnetful";
import { GET_POSTS } from "../../lib/queries";
import Link from "next/link";

interface BlogPost {
  title: string;
  slug: string;
  paragraph: string;
  content: { json: Document }; // Adjust this if using a specific rich text type
  coverImage: {
    title: string;
    fileName: string;
    url: string;
  };
  author: {
    name: string;
    picture: { url: string }; // Assuming picture contains a URL
  };
}

const Posts = async () => {
  const data = await client.request<{ postCollection: { items: BlogPost[] } }>(
    GET_POSTS
  );
  const blogs = data.postCollection.items;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Blog Posts
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((post) => (
            <li
              key={post.slug}
              className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="block cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-2.5">
                  {post.title}
                </h2>
                <figure>
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.title}
                    width={300}
                    height={300}
                    className="w-full"
                  />
                </figure>
                <p className="my-1.5 text-black">Author: {post.author.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
