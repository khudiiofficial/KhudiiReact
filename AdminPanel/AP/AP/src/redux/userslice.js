
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    _id:'',
    email:'',
    auth:false
}

export const userSlice=createSlice({
    name:'user',
    initialState:initialState,             // or you can write initialState instead of initialState:initialState

    reducers:{
        setUser:(state,action)=>{
            const {id,email,auth}=action.payload;
            state._id=id;
            state.email=email;
            state.auth=auth;
           

        },
        resetUser:(state,action)=>{  // if we remove action in parameter then no problem
        state._id="";
        state.email="";
        state.auth=false
        }
    }
})



export const {setUser,resetUser}=userSlice.actions;

export default userSlice.reducer; 