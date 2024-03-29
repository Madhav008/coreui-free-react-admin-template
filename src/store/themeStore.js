import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarShow: true,
    sidebarUnfoldable: false,
    theme: 'light',
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        setSidebar: (state, action) => {
            state.sidebarShow = action.payload
        },
        setSidebarFold: (state, action) => {
            state.sidebarUnfoldable = action.payload
        },
    },
});

export const { setTheme, setSidebar, setSidebarFold } = slice.actions;

export default slice.reducer;
