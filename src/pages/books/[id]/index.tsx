// pages/post/[postId].tsx

import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

const serverBaseUrl = "http://localhost:5050";

interface Post {
  id: string;
  userId: string;
  userName: string;
  postDate: string;
  imageUrl: string;
  title: string;
  condition: string;
  description: string;
  phoneNumber: string;
}

interface PostPageProps {
  initialPost: Post;
}

const dummyUserData = {
  isAuthenticated: true, // or false
};

const PostPage: React.FC<PostPageProps> = ({ initialPost }) => {
  const [post, setPost] = useState<Post | null>(initialPost);
  const [isFullView, setIsFullView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const handleGoBack = () => {
    router.back();
  };

  const handleToggleFullView = () => {
    setIsFullView(!isFullView);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-8">
        <button
          onClick={handleGoBack}
          className="p-3 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Go back"
        >
          {/* Uncomment if using FontAwesomeIcon */}
          {/* <FontAwesomeIcon icon={faArrowLeft} size="lg" /> */}
        </button>
        <div className="ml-4 flex flex-col">
          <a
            href={`/member/${post.userId}`}
            className="text-indigo-600 text-xl font-semibold hover:underline"
          >
            {post.userName}
          </a>
          <p className="text-gray-500">{post.postDate}</p>
        </div>
      </div>

      <div
        className={`relative ${
          isFullView ? "w-full h-80" : "w-full min-h-56"
        } mb-8 overflow-hidden rounded-lg cursor-pointer`}
        onClick={handleToggleFullView}
      >
        <img
          src={`${serverBaseUrl}${post.imageUrl}`}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg mb-2">
        <span className="font-semibold">Condition:</span> {post.condition}
      </p>
      <p className="text-lg mb-6">
        <span className="font-semibold">Description:</span> {post.description}
      </p>

      {dummyUserData.isAuthenticated ? (
        <a
          href={`https://wa.me/+962${post.phoneNumber}?text=Hello%20World`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300">
            Chat on WhatsApp
          </button>
        </a>
      ) : (
        <p className="text-red-600 text-lg mt-4">Login to contact</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;
  let initialPost: Post | null = null;

  try {
    const response = await axios.get(`${serverBaseUrl}/books/${postId}`);
    initialPost = response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  // Simulated JSON data if API request fails
  if (!initialPost) {
    initialPost = {
      id: "1",
      userId: "123",
      userName: "John Doe",
      postDate: "2024-08-12",
      imageUrl: "/assets/default.png",
      title: "Sample Post Title",
      condition: "New",
      description: "This is a sample description for the post.",
      phoneNumber: "123456789",
    };
  }

  return {
    props: {
      initialPost,
    },
  };
};

export default PostPage;
