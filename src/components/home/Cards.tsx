import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Cards = () => {
  const serverBaseUrl = "http://localhost:5050";

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      availability: "Available",
      image: "/assets/default.png",
    },
    {
      id: 2,
      title: "1984",
      availability: "Available",
      image: "/assets/exchange2.jpg",
    },
    {
      id: 3,
      title: "The Great Gatsby",
      availability: "Available",
      image: "/assets/exchangePP.jpg",
    },
    {
      id: 4,
      title: "The Great Gatsby",
      availability: "Available",
      image: "/assets/exchangePP.jpg",
    },
    {
      id: 5,
      title: "The Great Gatsby",
      availability: "Available",
      image: "/assets/exchangePP.jpg",
    },
    {
      id: 6,
      title: "1984",
      availability: "Available",
      image: "/assets/landindImg.jpg",
    },
    {
      id: 7,
      title: "To Kill a Mockingbird",
      availability: "Not Available",
      image: "/assets/exchangePP.jpg",
    },
  ]);

  const [userData] = useState({
    isAuthenticated: true,
    username: "JohnDoe",
  });
  const { isAuthenticated } = userData;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(isAuthenticated);
  }, [isAuthenticated]);

  const filteredPostsBy = Array.isArray(posts)
    ? posts.filter((post) => post.availability === "Available")
    : [];

  const filteredPosts = searchTerm
    ? filteredPostsBy.filter((post) =>
        post.title
          ? post.title.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    : filteredPostsBy;

  // Limit the number of posts to show initially
  const postsToShow = filteredPosts.slice(0, 6);

  return (
    <div className="px-4 lg:px-0 flex justify-center">
      <div className="md:flex flex-col w-screen lg:max-w-screen-dt ">
        <div className="p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Posts</h3>
              <div className="flex items-center">
                <div className="relative">
                  {/* <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                  {/* <input
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="By Book Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  /> */}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {postsToShow.map((post) => (
                <Link href={`/books/${post.id}`} key={post.id} passHref>
                  <div className="card cursor-pointer p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                    {/* <img
                      src={`${serverBaseUrl}${post.image}`}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    /> */}
                    <Image
                      src={`${post.image}`}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <div className="card-content">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filteredPosts.length >= 6 && (
              <div className="mt-8">
                <Link href="/more-posts">
                  <div className="flex items-center justify-center mx-auto max-w-4xl py-4 px-6 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold text-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-pointer">
                    Show More
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
