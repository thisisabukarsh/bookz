import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import { FaEdit, FaPlus, FaKey, FaTrash } from "react-icons/fa";
// import NewPost from "../Feed/newPost";
// import ResetPasswordDialog from "./Dialogs/ResetPasswordDialog";
// import EditUserInfoDialog from "./Dialogs/EditUserInfoDialog";
// import EditPostDialog from "./Dialogs/EditPostDialog";
// import { PostsContext } from "../Context/PostsContext";
// import UserContext from "../Context/UserContext";
// import Logout from "../Login&SignUp/Logout/Logout";
// import defaultPhoto from "../../assets/default.png";
// import api from "../../api/axios";

interface Post {
  id: string;
  title: string;
  availability: string;
  imageUrl: string;
}

interface User {
  id: string;
  username: string;
  phoneNumber: string;
  email: string;
  image: string;
  averageRating: number;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const serverBaseUrl = "http://localhost:5050";

  const { userData, setUserData } = useContext(UserContext);
  const { isAuthenticated, user } = userData as {
    isAuthenticated: boolean;
    user: User | null;
  };

  const { setPosts, userPosts, setUserPosts } = useContext(PostsContext);
  const [profilePhoto, setProfilePhoto] = useState<string>(defaultPhoto);

  useEffect(() => {
    if (!!user && !!user.image) {
      setProfilePhoto(user.image);
    }
  }, [user]);

  const [showNewPostDialog, setShowNewPostDialog] = useState<boolean>(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditUserInfoDialog, setShowEditUserInfoDialog] =
    useState<boolean>(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] =
    useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("Posts");
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredPosts =
    selectedOption === "Posts"
      ? userPosts.filter((post: any) => post.availability === "Available")
      : userPosts.filter((post: any) => post.availability === "completed");

  const openDialog = (dialog: string, post?: Post) => {
    switch (dialog) {
      case "newPost":
        setShowNewPostDialog(true);
        break;
      case "editUserInfo":
        setShowEditUserInfoDialog(true);
        break;
      case "resetPassword":
        setShowResetPasswordDialog(true);
        break;
      case "editPost":
        setShowEditPostDialog(true);
        setEditingPost(post || null);
        break;
      default:
        break;
    }
  };

  const closeDialog = (dialog: string) => {
    switch (dialog) {
      case "newPost":
        setShowNewPostDialog(false);
        break;
      case "editUserInfo":
        setShowEditUserInfoDialog(false);
        break;
      case "resetPassword":
        setShowResetPasswordDialog(false);
        break;
      case "editPost":
        setShowEditPostDialog(false);
        break;
      default:
        break;
    }
  };

  const handleDeletePost = async (postId: string) => {
    // try {
    //   const response = await api.delete(`/books/delete/${postId}`, {
    //     withCredentials: true,
    //   });
    //   if (response.status === 200 || response.status === 204) {
    //     setPosts((prevPosts: Post[]) =>
    //       prevPosts.filter((post) => post.id !== postId)
    //     );
    //     setUserPosts((prevUserPosts: Post[]) =>
    //       prevUserPosts.filter((post) => post.id !== postId)
    //     );
    //     console.log("Post deleted successfully");
    //   } else {
    //     console.error("Error deleting post:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Network error:", error);
    // }
  };

  const addNewPost = async (newPost: Post) => {
    setUserPosts((prevUserPosts: Post[]) => [...prevUserPosts, newPost]);
    setShowNewPostDialog(false);
  };

  const handleProfilePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    // if (file) {
    //   const formData = new FormData();
    //   formData.append("image", file);

    //   try {
    //     const response = await api.post(
    //       `/users/uploaduserphoto/${user?.id}`,
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //         withCredentials: true,
    //       }
    //     );

    //     if (response.status === 200 || response.status === 201) {
    //       const newProfilePhotoURL = response.data.imageUrl;
    //       setProfilePhoto(newProfilePhotoURL);
    //       try {
    //         const response = await api.get(`/users/withall/${user?.id}`);
    //         setUserData({
    //           ...userData,
    //           user: { ...userData.user, image: response.data.image },
    //         });
    //       } catch (error) {
    //         console.error("Error fetching user data:", error);
    //         throw error;
    //       }
    //     } else {
    //       console.error("Error uploading photo:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Network error:", error);
    //   }
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {isAuthenticated ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Image
                src={`${serverBaseUrl}${profilePhoto}`}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full border-2 border-gray-300"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">{user?.username}</h2>
                <p className="text-gray-500">Phone: {user?.phoneNumber}</p>
                <p className="text-gray-500">Email: {user?.email}</p>
                <p className="text-gray-500">
                  Rating: {user?.averageRating} / 5
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openDialog("editUserInfo")}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {/* <FaEdit className="mr-2" />  */}
                Edit Info
              </button>
              <button
                onClick={() => openDialog("resetPassword")}
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                {/* <FaKey className="mr-2" />  */}
                Reset Password
              </button>
              {/* <Logout /> */}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="upload-photo"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {/* <FaEdit className="mr-2 inline-block" />  */}
              Upload New Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={handleProfilePhotoChange}
            />
          </div>
          <hr />
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                >
                  {selectedOption}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 inline-block ml-2 transition-transform ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {open && (
                  <div className="absolute mt-2 w-full bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedOption("Posts");
                        setOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Posts
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOption("Archive");
                        setOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Archive
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => openDialog("newPost")}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {/* <FaPlus className="mr-2" />  */}
                Add New Post
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.length === 0 ? (
                <p className="text-gray-500">
                  {selectedOption === "Posts"
                    ? "You haven't added any available books yet."
                    : "No completed books found in archive."}
                </p>
              ) : (
                filteredPosts.map((post: any) => (
                  <div
                    key={post.id}
                    className="bg-white border rounded-lg shadow-md overflow-hidden"
                  >
                    <a href={`/books/${post.id}`} className="block">
                      <Image
                        src={`${serverBaseUrl}${post.imageUrl}`}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </a>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openDialog("editPost", post)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            {/* <FaEdit /> */}
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            {/* <FaTrash /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* {showEditPostDialog && (
            <EditPostDialog
              post={editingPost}
              onClose={() => closeDialog("editPost")}
            />
          )}
          {showNewPostDialog && (
            <NewPost
              onClose={() => closeDialog("newPost")}
              onAddPost={addNewPost}
            />
          )}
          {showEditUserInfoDialog && (
            <EditUserInfoDialog onClose={() => closeDialog("editUserInfo")} />
          )}
          {showResetPasswordDialog && (
            <ResetPasswordDialog onClose={() => closeDialog("resetPassword")} />
          )} */}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">
            You need to be logged in to view this page.
          </h3>
          <p className="text-blue-500 hover:underline">
            <a href="/login" className="mx-2">
              Login
            </a>
            or
            <a href="/signup" className="mx-2">
              Sign Up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
