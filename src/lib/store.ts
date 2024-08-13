import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postsReducer from "./slices/postsSlice";
import loginReducer from "./slices/loginSlice";
import signupReducer from "./slices/signupSlice";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import fetchPostsReducer from "./slices/fetchPostsSlice";
import fetchUserPostsReducer from "./slices/fetchUserPostsSlice";
import createPostReducer from "./slices/createPostSlice";
import ratingReducer from "./slices/ratingSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    login: loginReducer,
    signup: signupReducer,
    resetPassword: resetPasswordReducer,
    fetchPosts: fetchPostsReducer,
    fetchUserPosts: fetchUserPostsReducer,
    createPost: createPostReducer,
    rating: ratingReducer,
    profile: profileReducer,
    DeletePost: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
