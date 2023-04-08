import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./post-service";

export const createPostThunk = createAsyncThunk(
  'posts/createPost',
  async (post) => {
    const newPost = await service.createPost(post)
    return newPost
})

export const findPostsThunk = createAsyncThunk(
  'posts/findPosts', async () =>
    await service.findPosts()
)

export const updatePostThunk =
  createAsyncThunk(
    'posts/updatePost',
    async (post) =>
      await service.updatePost(post)
)

export const deletePostThunk = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await service.deletePost(postId)
    return postId
})