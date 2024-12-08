import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/Users/userSlice';
import postSlice from '../features/Posts/postSlice';

export const store = configureStore({
  reducer: {
    user : userSlice,
    posts: postSlice,
  },
});