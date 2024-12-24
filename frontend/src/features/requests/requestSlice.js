import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { addRequest } from "./requestService";

const initialState = {
    requests:[],
    requestLoading:false,
    requestSuccess:false,
    requestError:false,
    requestMessage:"",
}

export const addFriendRequest = createAsyncThunk("add-friend-request",async(to_id,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().user.user.token;
        return addRequest(to_id,token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const requestSlice = createSlice({
    name:"request",
    initialState,
    reducers:{
        requestReset:(state)=>{
            state.requestLoading=false
            state.requestSuccess=false
            state.requestError=false
            state.requestMessage=""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addFriendRequest.pending,(state,action)=>{
            state.requestLoading=true;
        })
        .addCase(addFriendRequest.rejected,(state,action)=>{
            state.requestError = true
            state.requestLoading = false
            state.requestMessage = action.payload
        })
        .addCase(addFriendRequest.fulfilled,(state,action)=>{
            state.requestError = false
            state.requestSuccess = true
            state.requestLoading = false
            state.requests.push(action.payload)
            state.requestMessage = action.payload
        })
    }
});

export const {requestReset} = requestSlice.actions;
export default requestSlice.reducer;