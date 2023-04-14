import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./comments-service.js"
export const createCommentThunk = createAsyncThunk(
    'review/createReview',
    async (tuit) => {
        const newComment = await service.createReview(tuit)
        return newComment;
    })
export const deleteCommentThunk = createAsyncThunk(
    'comments/deleteComment',
    async (commentId) => {
        await service.deleteReview(commentId)
        return commentId
    })