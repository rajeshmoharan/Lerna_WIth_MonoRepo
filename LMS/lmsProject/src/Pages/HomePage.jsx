import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import CourseBackgroundImage from '../assets/images.png'

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold">
            Find out best Courses
            <span className=" text-yellow-300">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We have a large libary of courses taught by highly qualifiled
            faculty members
          </p>
          <div className="space-x-6">
            <Link to="/courses">
              <button className="rounded-lg bg-yellow-500 text-black font-4xl p-2 ">Explore Courses</button>
            </Link>
            <Link to="/contact">
              <button className="rounded-lg bg-yellow-500 text-black font-4xl p-2 ">Contact Us</button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
            <img src={CourseBackgroundImage} width={600} className="rounded-full"/>
        </div>
      </div>
    </HomeLayout>
  );
}
export default HomePage;
