import Image from "next/image";
import client from "../../../lib/contnetful";
import { GET_POSTS_DETAILS } from "@/lib/queries";
import { notFound } from "next/navigation";

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

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const { postCollection } = await client.request<{
      postCollection: { items: BlogPost[] };
    }>(GET_POSTS_DETAILS, { slug });

    return postCollection?.items[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function BlogPostPage(props: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await props.params; 
  console.log(resolvedParams, "resolvedParams");

  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>

      {/* Cover Image */}
      <div className="w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={post.coverImage.url}
          alt={post.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="mt-6 text-gray-700 leading-relaxed">
        {JSON.stringify(post.content.json)}
      </div>

      {/* Author Section */}
      <div className="mt-10 flex items-center space-x-4 border-t pt-6">
        <Image
          src={post.author.picture.url}
          alt={post.author.name}
          width={80}
          height={80}
          className="w-16 h-16 rounded-full object-cover shadow-md"
        />
        <div>
          <p className="text-sm text-gray-500">Written by</p>
          <h4 className="text-lg font-semibold text-gray-800">
            {post.author.name}
          </h4>
        </div>
      </div>
    </div>
  );
}
