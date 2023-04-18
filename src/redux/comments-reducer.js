import { createSlice } from "@reduxjs/toolkit";
import {createCommentsThunk, deleteCommentThunk, findCommentsbyUserThunk, findCommentsbyBookThunk, updateCommentsThunk}
    from "../services/comments/comments-thunks";

const initialState = {
    comments: [],
    loading: false
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: {
        [findCommentsbyBookThunk.pending]:
            (state) => {
                state.loading = true
                state.comments = []
            },
        [findCommentsbyBookThunk.fulfilled]:
            (state, { payload }) => {
            console.log("state below")
                console.log(state.comments)
                state.loading = false
                state.comments = payload.reverse()

            },
        [findCommentsbyBookThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [findCommentsbyUserThunk.pending]:
            (state) => {
                state.loading = true
                state.comments = []
            },
        [findCommentsbyUserThunk.fulfilled]:
            (state, { payload }) => {
                console.log("state below")
                console.log(state.comments)
                state.loading = false
                state.comments = payload.reverse()

            },
        [findCommentsbyUserThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [deleteCommentThunk.fulfilled] :
            (state, { payload }) => {
                state.loading = false
                console.log(payload)
                state.comments = state.comments.filter(t => t._id !== payload)
            },
        [createCommentsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.comments.push(payload)
         },
        [updateCommentsThunk.fulfilled]:
            (state, { payload }) => {
            console.log("payload below")
            console.log(payload);
                state.loading = false
                const commentNdx = state.comments
                    .findIndex((comment) => comment._id === payload.comment._id)
                console.log({commentNdx})
                console.log(payload.comment.comment)

                state.comments[commentNdx] = {
                    ...state.comments[commentNdx],
                    comment :payload.comment.comment,
                    rating: payload.comment.rating

                }
            }
    },
    reducers: { }
});

export const {createComment, deleteComment} = commentSlice.actions;
export default commentSlice.reducer;