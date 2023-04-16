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
        [deleteCommentThunk.fulfilled] :
            (state, { payload }) => {
                state.loading = false
                state.comments = state.comments
                    .filter(t => t._id !== payload)
            },
        [createCommentsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.comments.push(payload)
         },
        [updateCommentsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                console.log(state.comments)
                console.log(payload)
                const commentNdx = state.comments
                    .findIndex((comment) => comment._id === payload.comment._id)
                state.comments[commentNdx] = {
                    ...state.comments[commentNdx],
                    ...payload.comment
                }
                // state.comments = commentNdx
            }
    },
    reducers: { }
});

export const {createComment, deleteComment} = commentSlice.actions;
export default commentSlice.reducer;