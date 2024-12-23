import api from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type ValidateTokenState = {
    isValid: boolean | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: ValidateTokenState = {
    isValid: null,
    status: 'idle',
    error: null,
};

export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('mainToken');
            if (!token) throw new Error('No token found');

            const response = await api.get('/api/validate-token', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.isValid;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Invalid token');
        }
    }
);

const validateTokenSlice = createSlice({
    name: 'validateToken',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(validateToken.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isValid = null;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isValid = action.payload;
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                state.isValid = false;
            });
    },
});

export default validateTokenSlice.reducer;