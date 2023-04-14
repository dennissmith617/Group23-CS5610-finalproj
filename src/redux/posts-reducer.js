import { createSlice } from "@reduxjs/toolkit";
import {createPostThunk, findPostsThunk, updatePostThunk, deletePostThunk}
  from "../services/posts/post-thunk";

const initialState = {
   posts: [],
   loading: false
}

const postSlice = createSlice({
 name: 'posts',
 initialState,
  extraReducers: {
    [findPostsThunk.pending]:
       (state) => {
          state.loading = true
          state.posts = []
    },
    [findPostsThunk.fulfilled]:
       (state, { payload }) => {
          state.loading = false
          state.posts = payload
    },
    [findPostsThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
    },
    [deletePostThunk.fulfilled] :
        (state, { payload }) => {
        state.loading = false
        state.posts = state.posts
        .filter(t => t._id !== payload)
    },
    [createPostThunk.fulfilled]:
          (state, { payload }) => {
            state.loading = false
            state.posts.push(payload)
        },
    [updatePostThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false
        const postNdx = state.posts
          .findIndex((t) => t._id === payload._id)
        state.posts[postNdx] = {
          ...state.posts[postNdx],
          ...payload
        }
      }
  },
 reducers: { }
});

export const {createPost, deletePost} = postSlice.actions;
export default postSlice.reducer;