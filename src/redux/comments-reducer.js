import { createSlice } from "@reduxjs/toolkit";
import {createCommentsThunk, deleteCommentThunk, findCommentsbyUserThunk, findCommentsbyBookThunk}
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
                state.posts = []
            },
        [findCommentsbyBookThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.posts = payload
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
         }
        // ,[updateCommentsThunk.fulfilled]:
        //     (state, { payload }) => {
        //         state.loading = false
        //         const commentNdx = state.comments
        //             .findIndex((t) => t._id === payload._id)
        //         state.comments[commentNdx] = {
        //             ...state.comments[commentNdx],
        //             ...payload
        //         }
        //     }
    },
    reducers: { }
});

export const {createComment, deleteComment} = commentSlice.actions;
export default commentSlice.reducer;