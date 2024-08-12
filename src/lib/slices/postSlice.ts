// redux/slices/postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface Post {
  id: string;
  title: string;
  condition: string;
  description: string;
  availability: string;
  category: string;
  imagesUrl: string[];
  images: string[];
  userId: number;
  phoneNumber: string;
}

interface PostsState {
  posts: Post[];
  userPosts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  userPosts: [],
  status: "idle",
  error: null,
};

// Dummy data
const dummyPosts: Post[] = [
  {
    id: "1",
    userId: 1,
    title: "Dummy Post",
    condition: "New",
    description: "This is a dummy post.",
    availability: "In Stock", // Added field
    category: "Electronics", // Added field
    imagesUrl: ["https://via.placeholder.com/150"],
    images: [], // Added field (assuming no images initially)
    phoneNumber: "123-456-7890",
  },
];

// Thunk for fetching posts
export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    try {
      const response = await api.get<Post[]>("/books");
      return response.data;
    } catch (error) {
      return dummyPosts; // Return dummy data on error
    }
  }
);

// Thunk for fetching user posts
export const fetchUserPosts = createAsyncThunk<Post[], string>(
  "posts/fetchUserPosts",
  async (userId: string) => {
    try {
      const response = await api.get<Post[]>(`/users/withall/${userId}`);
      return response.data;
    } catch (error) {
      return dummyPosts; // Return dummy data on error
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.userPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch posts";
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch user posts";
      });
  },
});

export const { setPosts, setUserPosts } = postsSlice.actions;
export default postsSlice.reducer;
