import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import { getUserData } from "../../redux/slices/AuthSlice";

function CheckoutSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  });

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80-h-[26rem] flex flex-col justify-center items-center">
          <h1 className="bg-green-500 text-center">Payment Successfull</h1>
          <div className="px-4 flex flex-col items-center  justify-center space-y-2">
            <h2 className="text-lg font-semibold">Welcome to the pro bundle</h2>
            <p className="text-left">Now you can enjoy all the courses</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default CheckoutSuccess;
