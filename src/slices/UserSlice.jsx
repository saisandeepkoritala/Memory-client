/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
        isUser:localStorage.getItem('user-info')
        ? true
        : false,
        userData:localStorage.getItem('user-info')
        ? JSON.parse(localStorage.getItem('user-info'))
        : [{"email":"none","displayName":"none"}],
        Memories:[]
    },
    reducers:{
        setisUser(state,action){
            state.isUser = action.payload;
            if(!action.payload){
                localStorage.removeItem("user-info")
            }
        },
        setuserData(state,action){
            state.userData = action.payload;
            localStorage.setItem("user-info",JSON.stringify(action.payload))
        },
        setMemories(state, action) {
            const newMemory = action.payload[0];
            state.Memories = state.Memories ? [...state.Memories, ...action.payload] : [...action.payload];
        }
        
    }
})



export const UserReducer = userSlice.reducer;
export const {setisUser,setuserData,setMemories} = userSlice.actions;