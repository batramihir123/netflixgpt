import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReucer from "./configSlice";
const appStore = configureStore(
    {
        reducer:{ 
            user:userReducer,
            movie:moviesReducer,
            gpt:gptReducer,
            config:configReucer,
        },
    });

export default appStore;