import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { logout, setPassword } from "../lib/slices/userSlice";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated, status, error } = useSelector(
    (state: RootState) => state.user
  );

  const [newPassword, setNewPassword] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleResetPassword = () => {
    if (user) {
      dispatch(setPassword(newPassword));
      setNewPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl p-6 bg-white  rounded-lg mt-10">
        {/* Profile Header */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex">
            <img
              src={user?.imageUrl || "/default-avatar.png"}
              alt={user?.username}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-semibold">{user?.username}</h1>
              <p className="text-gray-600">{user?.email}</p>
              {user?.phoneNumber && (
                <p className="text-gray-600">{user?.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="ml-auto">
            <span className="text-yellow-500 text-lg font-bold">
              ⭐ {user?.averageRating.toFixed(1)}
            </span>
            <p className="text-gray-500">{user?.ratings.length} Ratings</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">About {user?.username}</h2>
          <p className="text-gray-700 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            ullamcorper, neque sit amet dignissim tristique, purus dui lacinia
            eros, eget tincidunt mauris nulla sit amet lorem.
          </p>
        </div>

        {/* Books Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {user?.books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-50 shadow-sm rounded-lg overflow-hidden"
              >
                <img
                  src={book.imageUrl || "/default-book.png"}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {book.description}
                  </p>
                  <p className="text-gray-400 mt-2 text-xs">
                    Posted on
                    {/* {new Date(book.createdAt).toLocaleDateString()} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
