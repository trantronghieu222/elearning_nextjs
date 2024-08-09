import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import courseReducer from "./reducers/courseReducer";


export const store = configureStore({
    reducer: {
        usersReducer,
        courseReducer
    }
})