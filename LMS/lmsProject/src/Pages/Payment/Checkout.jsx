import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getRazorPayid, purchaseCourseBundle, verifyUserPayment } from "../../redux/slices/RazorpaySlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";

function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state.razorpay?.key)
    const suscription_id = useSelector((state) => state.razorpay?.suscription_id);
    const userData = useSelector((state) => state?.auth?.data);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const paymentDetails = {
        razorpay_payment_id : "",
        razorpay_suscription_id : "",
        razorpay_signature : ""
    }

    async function handleSubscription(e){
        e.preventDefault();
        if(!razorpayKey || !suscription_id){
            toast.error("Something went wrong");
            return;
        }

        const options = {
            key : razorpayKey,
            suscription_id : suscription_id,
            name : "Corsify pvt"
            description : "Suscription",
            theme : {
                color : '#F37254'
            },
            prefill : {
                email : userData?.email,
                name : userData?.fullName
            },
            handler : async function (response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id,
                paymentDetails.razorpay_suscription_id = response.razorpay_suscription_id,
                paymentDetails.razorpay_signature = response.razorpay_signature,

                toast.success("Payment successfull");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail")

            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayid())
        await dispatch(purchaseCourseBundle())
    }

    useEffect(() => {
        load()
    },[])

  return (
    <HomeLayout>
        <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
        >
            <div className="w-80-h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black]">
                <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl rounded">Suscription Bundle</h1>
                <div className="px-4 space-y-5 text-center">
                    This purchase will allow you to access all the available course of our platform{""}
                    <span className="text-yellow-500 font-bold">
                            <br/>
                            1 Year duration
                    </span>
                    All the existing and new launched courses will be also available
                    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                        <BiRupee/><span>499</span>only
                    </p>
                    <div className="text-gray-200">
                        <p>
                            100% refund on calcellation
                        </p>
                        <p>*Term and conditions applied</p>
                    </div>
                    <button type="submit" className="bg-yellow-500 text-lg  rounded-lg font-bold">
                        Buy now
                    </button>
                </div>
            </div>
        </form>
    </HomeLayout>
  )
}
export default Checkout