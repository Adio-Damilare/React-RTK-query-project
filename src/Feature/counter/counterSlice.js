import { createSlice } from "@reduxjs/toolkit";
const initialState={
    count:0,
};
export const counterSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{
        Increment:(state)=>{
            state.count+=1;
        },
        Decrement:(state)=>{
            if(state.count<=0){
             state.count=0;
            }
            else{

                state.count-=1;
            }
        },
        Reset:(state)=>{
            state.count=0;
        }, 
        AddByAmount:(state,action)=>{
            state.count+=action.payload;
        }
    }
});

export const {Increment,Decrement,Reset,AddByAmount} =counterSlice.actions;

export default counterSlice.reducer;