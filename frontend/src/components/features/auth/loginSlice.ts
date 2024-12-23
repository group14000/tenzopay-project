import api from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type LoginState = {
    tokens: {
        mainToken: string | null;
        refreshToken: string | null;
    } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: LoginState = {
    tokens: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/login', credentials);
            const tokens = response.data.tokens;
            localStorage.setItem('mainToken', tokens.mainToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            return tokens;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Something went wrong');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('mainToken');
    localStorage.removeItem('refreshToken');
});

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tokens = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.tokens = null;
                state.status = 'idle';
            });
    },
});

export default loginSlice.reducer;
