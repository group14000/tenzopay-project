import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/components/features/auth/loginSlice';
import signupReducer from '@/components/features/auth/signupSlice';
import validateTokenReducer from '@/components/features/auth/validateTokenSlice';
import profileReducer from '@/components/features/auth/profileSlice';

const store = configureStore({
    reducer: {
        auth: loginReducer,
        signup: signupReducer,
        validateToken: validateTokenReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;