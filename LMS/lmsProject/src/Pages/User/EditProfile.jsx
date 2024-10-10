import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";

function EditProfile() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    uerId: useSelector((state) => state?.auth?.data?._id),
  });

  const navigate = useNavigate();

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const [name, value] = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fileds are mandatory");
      return;
    }

    if (!data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.uerId, formData]));

    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label className="w-28 h-28 rounded-full m-auto cursor-pointer">
            {data.previewImage ? (
              <img src={data?.previewImage} />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg,.png,.svg,.jpeg"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">FullName</label>
            <input
                required
                type="text"
                name="fullName"
                placeholder="Enter your name"
                className="bg-transparent px-2 py-1 border"
                value={data.fullName}
                onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="w-full bg-yellow-600 transition-all ease-in-out">Update profile</button>
          <Link to="/user/profile">
            <p>Go back to profile</p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
export default EditProfile;
