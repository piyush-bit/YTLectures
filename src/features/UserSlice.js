import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name : 'user',
    initialState : {
       user : false
    },
    reducers : { 
        addUser : (state,action)=>{
            state.user=action.payload;
        },
        removeUser : (state,action)=>{
            state.user=false;
        }
    }
})
export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;