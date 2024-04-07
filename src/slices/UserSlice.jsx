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
        Memories:[],
        TotalPages:1,
        CurrentPage:1,
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
            // state.Memories = state.Memories ? [...state.Memories, ...action.payload] : [...action.payload];
            state.Memories = [...action.payload];
        },
        setTotalPages(state,action){
            state.TotalPages = action.payload;
        },
        setCurrentPage(state,action){
            state.CurrentPage = action.payload;
        },
        setupdatedLike(state,action){
            const updatedMemories = state.Memories.map(memory => {
                if (memory._id === action.payload._id) {
                    return action.payload;
                }
                return memory;
            });
            console.log(updatedMemories)
            state.Memories = updatedMemories;
        }
        
    }
})



export const UserReducer = userSlice.reducer;
export const {setisUser,setuserData,
    setMemories ,setTotalPages ,
    setCurrentPage,setupdatedLike} = userSlice.actions;