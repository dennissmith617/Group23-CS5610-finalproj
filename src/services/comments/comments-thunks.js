import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./comments-service.js";

export const findALlCommentsThunk = createAsyncThunk("comments/findAll", async () => {
    const comments = await service.findAllComments();
    return comments;
});

export const createCommentsThunk = createAsyncThunk(
    'comments/createComments',
    async (comment) => {
        const newComment = await service.createReview(comment)
        return newComment
    })

export const findCommentsbyUserThunk = createAsyncThunk(
    'comments/findComments', async (username) =>
        await service.getCommentsByUserId(username)
)
export const findCommentsbyBookThunk = createAsyncThunk(
    'comments/findComments', async (googleId) =>
        await service.getCommentsByBookId(googleId)
)

export const updateCommentsThunk =
    createAsyncThunk(
        'comments/updateComments',
        async (comment) => await service.updateComment(comment)

    )

export const deleteCommentThunk = createAsyncThunk(
    'comments/deleteComment',
    async (commentId) => {
        await service.deleteReview(commentId)
        return commentId
    })