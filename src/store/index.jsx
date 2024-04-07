import {configureStore} from "@reduxjs/toolkit";
import {UserReducer} from "../slices/UserSlice";

const store = configureStore({
    reducer:{
        user:UserReducer
    }
})

export {store};
// eslint-disable-next-line react-refresh/only-export-components
export * from "../slices/UserSlice";

