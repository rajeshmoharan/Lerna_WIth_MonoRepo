import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../redux/slices/RazorpaySlice";
import { getUserData } from "../../redux/slices/AuthSlice";
import toast from "react-hot-toast";

function Profile() {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  useEffect(() => {}, []);

  const handleCancellation = async() => {
    await dispatch(cancelCourseBundle())
    await dispatch(getUserData())
    toast.success('Cancellation Completed')
    navigate("/home")
  }

  return (
    <HomeLayout>
      <div className="min-h[90vh] flex items-center justify-center">
        <div className="my-10 flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?secure_url}
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
           <p>Email: {userData?.email}</p>
           <br/>
           <p>Role : <p>{userData?.role}</p></p>
           <br/>
           <p>Suscription : {userData?.suscription?.status === 'active' ? "ACTIVE" : "INACTIVE"}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
              <Link to="/changepassword" 
              className="w-1/2 bg-yellow-500"
              >
                <button>ChnagePassword</button>
              </Link>
              <Link to="/user/editprofile" 
              className="w-1/2 bg-yellow-500"
              >
                <button>Edit Profile</button>
              </Link>
              {userData?.suscription?.active === 'created' && (
                <button
                onClick={handleCancellation}
                className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out"
                >Cancel Suscription</button>
              )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default Profile;
