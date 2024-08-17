import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import activeWidgetsReducer from "./ActiveWidgetsSlice";

const store = configureStore({
    reducer: {
        category: userReducer,
        activeWidgets: activeWidgetsReducer,
    },
});

export default store;
