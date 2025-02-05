import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { addRequest, getMyRequests, rejectRequest } from "./requestService";

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
        return await addRequest(to_id,token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const myRequestsData = createAsyncThunk("get-my-requests", async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().user.user.token;
        return await getMyRequests(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

export const rejectRequestData = createAsyncThunk("reject-request",async(userData,thunkAPI)=>{
    // console.log(userData)
    try {
        return await rejectRequest(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
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
        builder
        .addCase(addFriendRequest.pending,(state,action)=>{
            state.requestLoading=true;
        })
        .addCase(addFriendRequest.rejected,(state,action)=>{
            state.requestError = true
            state.requestLoading = false
            state.requestMessage = action.payload
        })
        .addCase(addFriendRequest.fulfilled,(state,action)=>{
            state.requestSuccess = true
            state.requestLoading = false
        })
        .addCase(myRequestsData.pending,(state,action)=>{
            state.requestLoading=true;
        })
        .addCase(myRequestsData.rejected,(state,action)=>{
            state.requestError = true
            state.requestLoading = false
            state.requestMessage = action.payload
        })
        .addCase(myRequestsData.fulfilled,(state,action)=>{
            state.requestSuccess = true
            state.requestLoading = false
            state.requests = action.payload
        })
        .addCase(rejectRequestData.pending,(state,action)=>{
            state.requestLoading = true
        })
        .addCase(rejectRequestData.rejected,(state,action)=>{
            state.requestError = true
            state.requestLoading = false
            state.requestMessage = action.payload
        })
        .addCase(rejectRequestData.fulfilled,(state,action)=>{
            state.requestSuccess = true
            state.requestLoading = false
            state.requests.filter((item,index)=>{
                return item._id !== action.payload._id
            })
        })
    }
});

export const {requestReset} = requestSlice.actions;
export default requestSlice.reducer;