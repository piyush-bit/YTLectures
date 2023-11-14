import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name : 'user',
    initialState : {
       user : { 
            }
    },
    reducer : { 
        addUser : (state,action)=>{
            state.user=action.user;
        },
        removeUser : (state,action)=>{
            state.user={};
        }
    }
})
export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;