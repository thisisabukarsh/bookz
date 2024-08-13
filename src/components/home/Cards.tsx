import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { fetchPosts } from "../../lib/thunks/fetchPostsThunk";
import Link from "next/link";
import Image from "next/image";

const Cards = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, status } = useSelector((state: RootState) => state.fetchPosts);
  console.log(posts);
  console.log(status);

  const baseURL = "http://localhost:5050";

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postsToShow = posts.slice(0, 6);

  // console.log(postsToShow[4]?.images?.[0]?.url.toString());

  return (
    <div className="px-4 lg:px-0 flex justify-center">
      <div className="md:flex flex-col w-screen lg:max-w-screen-dt">
        <div className="p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Posts</h3>
              <div className="flex items-center">
                <div className="relative">
                  {/* Uncomment if you need a search input */}
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
                    <img
                      src={`${baseURL}${post?.images[1]?.url}`}
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
            {posts.length >= 6 && (
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
