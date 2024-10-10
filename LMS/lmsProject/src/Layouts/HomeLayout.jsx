/* eslint-disable react/jsx-no-comment-textnodes */
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";

// eslint-disable-next-line react/prop-types
function HomeLayout({ children }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    if (drawerSide.length > 0) {
      drawerSide[0].style.width = "auto"; // Set the desired width
    }
  };

  const hideDrawer = () => {
    const toggleElement = document.getElementsByClassName("drawer-toggle");
    if (toggleElement.length > 0) {
      toggleElement[0].checked = false; // Uncheck the toggle
    }

    const drawerSide = document.getElementsByClassName("drawer-side");
    if (drawerSide.length > 0) {
      drawerSide[0].style.width = "0"; // Set width to 0 to hide the drawer
    }
  };

  {
    /** logout functionality */
  }
  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/home");
  };

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay">
            <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content">
              <li className="w-fit absolute right-2 z-50">
                <button onClick={hideDrawer}>
                  <IoMdClose size={24} />
                </button>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )}
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/course/create">Create new course</Link>
                </li>
              )}
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {/*if not logged in then show login or singup*/}
              {!isLoggedIn && (
                <li className="absolute bottom-4 w-[90%">
                  <div className="w-full flex items-center justify-center gap-4">
                    <button className="btn-primary bg-blue-600 px-4 py-1 font-semibold rounded-md w-full">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn-secondary bg bg-purple-500 px-4 py-1 font-semibold rounded-md w-full">
                      <Link to="/signup">Signup</Link>
                    </button>
                  </div>
                </li>
              )}
              {/*if  logged in then show profile or Logout*/}
              {isLoggedIn && (
                <li className="absolute bottom-4 w-[90%">
                  <div className="w-full flex items-center justify-center gap-4">
                    <button className="btn-primary bg-blue-600 px-4 py-1 font-semibold rounded-md w-full">
                      <Link to="/profile">Profile</Link>
                    </button>
                    <button className="btn-secondary bg bg-purple-500 px-4 py-1 font-semibold rounded-md w-full">
                      <Link to="/logout" onClick={handleLogout}>
                        Logout
                      </Link>
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </label>
        </div>
      </div>

      {/* //children props render here  */}
      {children}
      <Footer />
    </div>
  );
}
export default HomeLayout;
