import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const getImage = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  };

  {
    /** creatNewAccount method will create the new account*/
  }
  const createNewAccount = async (e) => {
    e.preventDefault();
    {
      /** if dont have avatar, email , fullName and password then error toast message will give */
    }
    if (
      !signupData.avatar ||
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password
    ) {
      toast.error("Please fill all the details", { duration: 600 });
      return;
    }

    {
      /** checking the fullName length if no greater than 5 then give error toast */
    }
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters", { duration: 600 });
      return;
    }

    if (
      !signupData.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      toast.error("Invalid Email", { duration: 600 });
      return;
    }

    if (
      !signupData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one letter and one number"
      );
      return;
    }

    {
      /** creating formData to send data */
    }
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    {
      /**using the dispatch method sending data */
    }

    const res = await dispatch(createNewAccount(formData));
    if (res?.payload?.success) {
      navigate("/");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh] w">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          {/** Image  */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
            name="image_uploads"
          />

          {/** Email , Password, Name */}
          <div className="flex flex-col gap-1">
            {/* FullName */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-semibold">
                FullName
              </label>
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                placeholder="Enter your fullName"
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signupData.fullName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email"
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signupData.email}
              />
            </div>
            {/** Password*/}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password"
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signupData.password}
              />
            </div>
          </div>

          {/** Buuton for create accout */}
          <button
            type="submit"
            className="w-full bg-yellow-400 p-2 text-black font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm"
          >
            Create account
          </button>

          {/** Already have account then show Login Page */}
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
