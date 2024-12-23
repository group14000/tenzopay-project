import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

type ProfileState = {
    user: {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        mobileNumber: string;
    } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: ProfileState = {
    user: null,
    status: 'idle',
    error: null,
};

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('mainToken');
            if (!token) throw new Error('No token found');

            const response = await api.get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.user;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Failed to fetch profile');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.user = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                state.user = null;
            });
    },
});

export default profileSlice.reducer;
