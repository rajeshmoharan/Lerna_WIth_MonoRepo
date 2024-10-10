import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from './slices/CourseSlice';
import razorPaySliceReducer from './slices/RazorpaySlice';
import lectureSliceReducer from './slices/LectureSlice'
import statSliceReducer from './slices/StaSlice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course : courseSliceReducer,
    razorpay : razorPaySliceReducer,
    lecture : lectureSliceReducer,
    stat : statSliceReducer
  },
  devTools: true,
});

export default store;
