import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";

const initialState = {
  courseData: [],
};

{
  /**get all the courses */
}
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "loading course data....",
      success: "Courses loaded successfully",
      error: "Failed to load courses",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createCourse = createAsyncThunk("/course/create", async(data) => {
    try {
        let formData = new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("category",data?.category);
        formData.append("createdBy",data?.category);
        formData.append("thumbnail",data?.thumbnail);

        const response = axiosInstance.post("/course",formData);
        toast.promise(response, {
          loading : "Creating new course",
          success : "Course created successfully",
          error : "Failed to create course"
        })

        return (await response).data
  
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
})
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`courses/${id}`);

    toast.promise(res, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.courseData = [...action.payload];
    });
  },
});

export default courseSlice.reducer;
