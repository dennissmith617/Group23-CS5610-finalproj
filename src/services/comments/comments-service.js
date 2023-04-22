import axios from 'axios';

import {findCommentsbyBookThunk} from "./comments-thunks";
const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_API = 'http://localhost:4000/api/comments/';

export const createReview = async (review) => {
    const response = await axios.post(COMMENTS_API, review)
    return response.data;
}

export const findAllComments = async () => {
    const response = await axios.get(COMMENTS_API);
    return response.data;
};

export const getCommentsByBookId = async (google_id) =>{
    const response = await axios.get(COMMENTS_API+`bookcomments/${google_id}`)
    return response.data
}
export const getCommentsByUserId = async (userid) =>{
    console.log(userid)
    const response = await axios.get(COMMENTS_API+`usercomments/${userid}`)
    return response.data
}

export const deleteReview = async (comment_id) =>{
    const response = await axios.delete(COMMENTS_API+`bookcomments/${comment_id}`)
    return response.data
}

export const updateComment = async (comment) => {
    const response = await axios
        .put(COMMENTS_API+`updateComment/${comment._id}`, comment);
    return response.data;
}

export const getReaditBookRating = async (book_id) =>{
    const response = await axios.get(COMMENTS_API+`bookRating/${book_id}`)
    return response.data
}