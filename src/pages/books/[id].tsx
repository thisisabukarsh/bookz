import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { fetchPost } from "../../lib/thunks/fetchPostThunk";
import Image from "next/image";
const baseURL = "http://localhost:5050";

const PostPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  const { post, status, error } = useSelector((state: RootState) => state.post);
  const { isAuthenticated } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (id) {
      console.log("pppppp", post);
      dispatch(fetchPost(id as string));
    }
  }, [id, dispatch]);

  const handleGoBack = () => {
    router.back();
  };

  const handleToggleFullView = () => {
    // Implement full view toggle logic here
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200 m-4">
      <div className="flex items-center mb-8">
        <button
          onClick={handleGoBack}
          className="p-3 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Go back"
        >
          {/* Uncomment if using FontAwesomeIcon */}
          {/* <FontAwesomeIcon icon={faArrowLeft} size="lg" /> */}
          --
        </button>
        <div className="ml-4 flex flex-col">
          <a
            href={`/member/${post.userId}`}
            className="text-indigo-600 text-xl font-semibold hover:underline"
          >
            {post.userName}
          </a>
          {/* <p className="text-gray-500">{post.postDate}</p> */}
        </div>
      </div>

      <div
        className={`relative mb-8 overflow-hidden rounded-lg cursor-pointer`}
        onClick={handleToggleFullView}
      >
        <Image
          src={`${baseURL}${post.imageUrls[0]}`}
          width={250}
          height={400}
          alt={post.title}
          className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg mb-2">
        <span className="font-semibold">Condition:</span> {post.condition}
      </p>
      <p className="text-lg mb-6">
        <span className="font-semibold">Description:</span> {post.description}
      </p>

      {isAuthenticated ? (
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

export default PostPage;
