import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../helper/axiosinstance";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      toast.error("All fileds are mandatory");
      return;
    }

    try {
        const response = axiosInstance.post("/contact",userInput);
        toast.promise(response, {
          loading : "Submitting your form",
          success : "Form submitted successfully",
          error : "Please try later"
        })
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmitForm}
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl p-2 font-semibold">Contact Form</h1>
          {/** this is name input  */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          {/** this is email input  */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border resize-none h-56  px-2 py-1 rounded-sm"
              id="message"
              type="text"
              name="message"
              placeholder="Enter your message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="w-full text-black bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Contact;
