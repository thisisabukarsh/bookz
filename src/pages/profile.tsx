// pages/profile.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { logout, setPassword } from "../lib/slices/userSlice";
import { useState } from "react";
import { useRouter } from "next/router";

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
      setNewPassword(""); // Clear the password input
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p>
          <strong>ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Name:</strong> {user?.username}
          <strong>Name:</strong> {user?.phoneNumber}
          <strong>Name:</strong> {user?.averageRating}
        </p>
        {/* Add more user details as needed */}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleResetPassword}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mt-2"
        >
          Reset Password
        </button>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-600">{error}</p>}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
