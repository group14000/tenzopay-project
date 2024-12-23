import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

type SignupState = {
    user: {
        userId: string | null;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        role: string | null;
        mobileNumber: string | null;
    } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message: string | null;
};

const initialState: SignupState = {
    user: null,
    status: 'idle',
    error: null,
    message: null,
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (
        userDetails: {
            firstName: string;
            lastName: string;
            email: string;
            role: string;
            mobileNumber: string;
            password: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post('/api/signup', userDetails);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Something went wrong');
        }
    }
);

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default signupSlice.reducer;
