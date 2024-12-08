import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getPosts, uploadPost } from "./postService";

const initialState = {
    posts: [],
    postLoading:false,
    postSuccess:false,
    postError:false,
    postMessage:'',
    getPostSuccess:false,
};

export const uploadPostData = createAsyncThunk('upload-post',async(postData,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().user.user.token;
        return await uploadPost(postData,token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});
export const getPostData = createAsyncThunk('get-posts',async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().user.user.token;
        return await getPosts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

//Create Slice
const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        postReset:(state)=>{
            state.postError = false;
            state.postLoading = false;
            state.postSuccess = false;
            state.postMessage = "";
            state.getPostSuccess = false;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(uploadPostData.pending,(state,action)=>{
            state.postLoading = true;
        })
        .addCase(uploadPostData.rejected,(state,action)=>{
            state.postLoading = false;
            state.postError = true;
            state.postMessage = action.payload;
        })
        .addCase(uploadPostData.fulfilled,(state,action)=>{
            state.postLoading = false;
            state.postMessage = action.payload;
            state.postSuccess = true;
            state.posts.push(action.payload);
        })
        .addCase(getPostData.pending,(state,action)=>{
            state.postLoading = true;
        })
        .addCase(getPostData.rejected,(state,action)=>{
            state.postLoading = false;
            state.postError = true;
            state.postMessage = action.payload;
        })
        .addCase(getPostData.fulfilled,(state,action)=>{
            state.postLoading = false;
            state.postMessage = action.payload;
            state.getPostSuccess = true;
            state.posts = action.payload;
        })
    }
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;

