import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_API = 'http://localhost:4000/api/comments/';

export const createReview = async (review) => {
    const response = await axios.post(COMMENTS_API, review)
    return response.data;
}
export const getCommentsByBookId = async (google_id) =>{
    const response = await axios.get(COMMENTS_API+`bookcomments/${google_id}`)
    return response.data
}
export const getCommentsByUserId = async (userid) =>{
    const response = await axios.get(COMMENTS_API+`bookcomments/userid/${userid}`)
    return response.data
}

export const deleteReview = async (comment_id) =>{
    const response = await axios.delete(COMMENTS_API+`bookcomments/${comment_id}`)
    return response.data
}