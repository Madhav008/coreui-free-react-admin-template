import { configureStore } from '@reduxjs/toolkit';
import reducer from './themeStore';
import authReducer from './authSlice';

export default configureStore({
    reducer: {
        app: reducer,
        auth: authReducer,
    },
});
