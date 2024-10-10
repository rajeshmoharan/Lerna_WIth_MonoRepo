import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosinstance"
import toast from "react-hot-toast";


const initialState = {
    key : "",
    suscription_id : "",
    isPaymentVerified : false,
    allPayments : {},
    finalMonths : {},
    monthlySalesRecord : []
}

export const getRazorPayid = createAsyncThunk("/razorpay/getId", async() => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to load data")
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse",async() => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async(data) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subscription_id : data.razorpay_subscription_id,
            razorpay_signature : data.razorpay_signature
        });
        return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);  
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async() => {
    try {
        const response = axiosInstance.get("/payments?count=100",);
        toast.promise(response,{
            loading : "Getting the payment records",
            success : (data) => {
                return data?.data?.message
            },
            error : "Failed to get payment records"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async() => {
    try {
        const response = axiosInstance.post("/payments/unsuscribe",);
        toast.promise(response,{
            loading : "Unsuscribing the bundle",
            success : (data) => {
                return data?.data?.message
            },
            error : "Failed to get suscribe"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})



const razorpaySlice = createSlice({
    name : "razorpay",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(getRazorPayid.fulfilled,(state,action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled,(state,action) => {
                state.suscription_id = action?.payload?.suscription_id
            })
            .addCase(verifyUserPayment.fulfilled,(state,action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected,(state,action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled,(state,action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })

    }
})

export default razorpaySlice.reducer;