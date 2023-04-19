import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import postsReducer from "./posts-reducer";
import commentsReducer from "./comments-reducer";

const store = configureStore({
    reducer: {
        users: usersReducer,
        postsData: postsReducer,
        commentsData: commentsReducer,
    },
});

export default store;