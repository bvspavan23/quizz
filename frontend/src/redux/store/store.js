import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import quizReducer from "../slice/quizSlice";
import joinReducer from "../slice/joinSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    join: joinReducer
  },
});

export default store;