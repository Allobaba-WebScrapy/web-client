import {  createSlice, PayloadAction } from '@reduxjs/toolkit';


// interface 
interface AutoScout24State{
    url:string;
}

// inisial state
const initialState:AutoScout24State = {
    url:'https://www.autoscout24.com/lst/?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=D&atype=C&',
};

// create slice
const autoscout24Slice = createSlice({
    name:'autoscout24',
    initialState,
    reducers:{
        setUrl:(state ,action:PayloadAction<string>)=>{
            state.url = action.payload
        }
    }
});


export const {setUrl} = autoscout24Slice.actions;

export default autoscout24Slice.reducer;