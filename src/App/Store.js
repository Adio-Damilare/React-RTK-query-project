import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Feature/counter/counterSlice";
import postReducer from "../Feature/Post/postSlice";
import userReducer from "../Feature/Users/UserSlice"

export const store=configureStore({
    reducer:{
        counter:counterReducer,
        posts:postReducer,
        users:userReducer
    }
})