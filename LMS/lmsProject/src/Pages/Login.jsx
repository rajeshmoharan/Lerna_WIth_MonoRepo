
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../redux/slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLogindata({
      ...logindata,
      [name]: value,
    });
  };

  {
    /** creatNewAccount method will create the new account*/
  }
  const onLogin = async (e) => {
    e.preventDefault();
    {
      /** if dont have avatar, email , fullName and password then error toast message will give */
    }

    if(!logindata.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        toast.error("Invalid mail");
        return;
    }

    if (!logindata.email || !logindata.password) {
      toast.error("Please fill all the details", { duration: 600 });
      return;
    }

    {
      /**using the dispatch method sending data */
    }

    const res = await dispatch(login(logindata));
    if (res?.payload?.success) {
      navigate("/");
    }

    setLogindata({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh] w">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          {/** Email , Password */}
          <div className="flex flex-col gap-1">
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
                value={logindata.email}
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
                value={logindata.password}
              />
            </div>
          </div>

          {/** Buuton for create accout */}
          <button
            type="submit"
            className="w-full bg-yellow-400 p-2 text-black font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm"
          >
            Login
          </button>

          {/** Already have account then show Login Page */}
          <p className="text-center">
            Dont have an account ?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;
