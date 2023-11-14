import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/UserSlice.js'

export const store=configureStore({
    reducer : userReducer
})