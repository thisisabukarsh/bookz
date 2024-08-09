import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

interface Post {
  id: string;
  title: string;
  description: string;
}

interface Props {
  category: string;
  posts: Post[];
}

const CategoryPage: React.FC<Props> = ({ category, posts }) => {
  const router = useRouter();
  const { param } = router.query;

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Category: {category}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Fetch posts based on category from the server
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { param } = context.query;
  const category = param ? (param as string) : "";

  // Fetch posts based on the category
  // This is just a placeholder; replace with your data fetching logic
  const posts: Post[] = [
    {
      id: "1",
      title: "Sample Post 1",
      description: "This is a sample post in category " + category,
    },
    {
      id: "2",
      title: "Sample Post 2",
      description: "This is another sample post in category " + category,
    },
    // Add more posts as needed
  ];

  return {
    props: {
      category,
      posts,
    },
  };
};

export default CategoryPage;
