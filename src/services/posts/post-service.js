import axios from "axios";
const POSTS_API_URL = "http://localhost:4000/api/posts";

export const createPost = async (post) => {
 const response = await axios.post(POSTS_API_URL, post)
 return response.data;
}

export const findPosts = async () => {
 const response = await axios.get(POSTS_API_URL);
 const posts = response.data;
 return posts;
}

export const updatePost = async (post) => {
  const response = await axios
    .put(`${POSTS_API_URL}/${post._id}`, post);
  return post;
}

export const deletePost = async (pid) => {
  const response = await axios
    .delete(`${POSTS_API_URL}/${pid}`)
  return response.data
}