import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { registerUser, verifyOTP } from "./userService";

const checkUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: checkUser ? checkUser : null,
    userLoading: false,
    userError: false,
    userSuccess: false,
    userMessage: "",
};

// Get the function from the Service
export const registerUserData = createAsyncThunk("register-User", async(userData,thunkAPI)=>{
    try {
        return await registerUser(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

// Get the function from the Service
export const verifyOtpData = createAsyncThunk("verify-OTP", async(otpData, thunkAPI)=>{
    try {
        return await verifyOTP(otpData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userReset: (state) => {
            state.userLoading = false;
            state.userError = false;
            state.userSuccess = false;
            state.userMessage = "";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUserData.pending,(state,action)=>{
            state.userLoading = true
        })
        .addCase(registerUserData.rejected,(state,action)=>{
            state.userError = true
            state.userLoading = false
            state.userMessage = action.payload
            state.user = null
        })
        .addCase(registerUserData.fulfilled,(state,action)=>{
            state.user = action.payload
            state.userSuccess = true
            state.userLoading = false
        })
        .addCase(verifyOtpData.pending, (state,action)=>{
            state.userLoading = true
        })
        .addCase(verifyOtpData.rejected, (state,action)=>{
            state.userLoading = false
            state.userError = true
            state.userMessage = action.payload
        })
        .addCase(verifyOtpData.fulfilled, (state,action)=>{
            state.userLoading = false
            state.userError = false
            state.userSuccess = true
            state.user = {
                ...state.user,
                ...action.payload, // Merge new data, including `otp: null`
            };
            localStorage.setItem('user', JSON.stringify(state.user));
        })
    },
});

// Export Slice reducer in Store
export default userSlice.reducer
export const {userReset} = userSlice.actions