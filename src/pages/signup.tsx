// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../lib/store";
import { signupUser } from "../lib/slices/userSlice";

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }

    try {
      await dispatch(signupUser({ username, email, password })).unwrap();
      setSuccess(true);
    } catch (err) {
      setErrMsg("Signup failed. Please try again.");
    }
  };

  if (success) {
    router.push("/login");
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-semibold mb-1"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUpPage;
