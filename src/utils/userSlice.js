import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice( {
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action) =>{
          return action.payload;
        },
        removeUSer:(state,action) =>{
            return null; 
        },
    },
});

export const {addUser,removeUSer} = userSlice.actions;

export default userSlice.reducer;