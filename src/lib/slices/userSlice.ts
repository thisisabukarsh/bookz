// redux/slices/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface Post {
  id: string;
  userId: string;
  title: string;
  condition: string;
  description: string;
  imageUrl: string;
  phoneNumber: string;
}
interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber?: string; // Added phone number
  password?: string;
  imageUrl?: string;
  averageRating: number;
  books: Post[];
  ratings: number[];
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Dummy user data for fallback
const dummyUser: User = {
  id: 0,
  username: "Guest",
  email: "guest@example.com",
  phoneNumber: "0000000000", // Dummy phone number
  password: "dummyPassword",
  averageRating: 0,
  books: [],
  ratings: [],
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// Thunk for user signup
export const signupUser = createAsyncThunk<
  User,
  { Username: string; Email: string; phoneNumber: string; Password: string }
>("user/signupUser", async (credentials) => {
  try {
    const response = await api.post<User>("/account/register", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Signup failed. Please try again."); // Return an error message on failure
  }
});

// Thunk for user login
export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string }
>("user/loginUser", async (credentials) => {
  try {
    const response = await api.post<User>("/account/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials."); // Throw an error on failure
  }
});

// Thunk for resetting password
export const resetUserPassword = createAsyncThunk(
  "user/resetPassword",
  async ({
    newPassword,
    username,
  }: {
    newPassword: string;
    username: string;
  }) => {
    try {
      const response = await api.post("/users/reset/password", {
        newPassword,
        username,
      });
      return response.data;
    } catch (error) {
      return { success: false }; // Return a default result on error
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.phoneNumber = action.payload;
      }
    },
    setPassword: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.password = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to login";
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to sign up";
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetUserPassword.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to reset password";
      });
  },
});

export const { login, logout, setPhoneNumber, setPassword } = userSlice.actions;
export default userSlice.reducer;
