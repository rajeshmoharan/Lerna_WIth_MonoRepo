import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helper/axiosinstance"

const initialState = {
    lectures : []
}

export const getCourseLectures = createAsyncThunk("/course/lecture/get", async(cid) => {
    try {
        const response = axiosInstance.get(`/course/${cid}`);
        toast.promise(response,{
            loading : "Fetching course details",
            success : "Lecture fetched successfully",
            error : "Failed to get lecture data"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async(data) => {
    try {
        const formData = new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title",data.title);
        formData.append("description",data.description);


        const response = axiosInstance.get(`/course/${data.id}`,formData);
        toast.promise(response,{
            loading : "Adding course details",
            success : "Course added successfully",
            error : "Failed to add lecture "
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const deleteLecture = createAsyncThunk("/course/lecture/delete", async(data) => {
    try {  
        const response = axiosInstance.get(`/course?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading : "deleting course details",
            success : "lecture deleted successfully",
            error : "Failed to delete lecture "
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const lectureSlice = createSlice({
    name : 'lecture',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(getCourseLectures.fulfilled,(state,action) => {
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled,(state,action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
    }
})

export default lectureSlice.reducer;