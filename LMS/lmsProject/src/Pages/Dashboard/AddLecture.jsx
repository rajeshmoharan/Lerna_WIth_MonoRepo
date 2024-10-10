import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../redux/slices/LectureSlice";
import { AirOutlined } from "@mui/icons-material";

function AddLecture() {
  const courseLecture = useLocation().state;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseLecture._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const [name, value] = e.target;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.id ||
      !userInput.lecture ||
      !userInput.description ||
      !userInput.title
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
        navigate(-1)
      setUserInput({
        id: courseLecture._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  useEffect(() => {
    if (!courseLecture) navigate("/courses");
  });

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-161">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-xl text-green-500"
              onClick={() => navigate(-1)}
            >
              <AirOutlined />
            </button>
            <h1 className="">Add new lecture</h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="enter the title of the lecute"
              onChange={handleInputChange}
              value={userInput.title}
              className="px-3 py-1 border bg-transparent"
            />

            <textarea
              type="text"
              name="description"
              placeholder="enter the description of the lecute"
              onChange={handleInputChange}
              value={userInput.description}
              className="px-3 py-1 border bg-transparent resize-none overflow-scroll"
            />

            {
                userInput.videoSrc ? (
                    <video
                        muted
                        src={userInput.videoSrc}
                        controls
                        controlsList="nodownload nofullscreen"
                        disablePictureInPicture
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                    >

                    </video>
                ):(
                    <div>
                        <label className="font-semibold text-cl cursor-pointer" htmlFor="lecture">choese your file</label>
                        <input
                            type="file"
                            accept="video/mp4 video/x-mp4"
                            className="hidden"
                            id="lecture"
                            name="lecture"
                            onChange={handleVideo}
                        />
                    </div>
                )
            }
            <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">Add new Lecture</button>

          </form>
        </div>
      </div>
    </HomeLayout>
  );
}
export default AddLecture;
