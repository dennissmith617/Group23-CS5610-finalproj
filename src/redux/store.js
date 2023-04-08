import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import postsReducer from "./posts-reducer";

const store = configureStore({
    reducer: {
        users: usersReducer,
        postsData: postsReducer,
    },
});

export default store;