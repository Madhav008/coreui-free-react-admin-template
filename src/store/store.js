import { configureStore } from '@reduxjs/toolkit';
import reducer from './themeStore'; // import your reducer from the file where you defined it

export default configureStore({
    reducer: {
        app: reducer,
    },
});
