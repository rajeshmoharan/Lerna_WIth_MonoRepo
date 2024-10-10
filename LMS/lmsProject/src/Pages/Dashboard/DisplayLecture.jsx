import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteLecture,
  getCourseLectures,
} from "../../redux/slices/LectureSlice";

function DisplayLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state?.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (!state) {
      dispatch(getCourseLectures(state?._id));
    }
  });

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(deleteLecture({ courseId: courseId, lectureId: lectureId }));
    await dispatch(getCourseLectures(state?._id));
  }

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-center">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </div>

        <div className="flex justify-center gap-10 w-full">
          <div className="space-y-5 w-[20rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
          </div>
          {/** right section */}
          <ul>
            <li>
              <p>Lecturs list</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", { state: { ...state } })
                  }
                  className="btn-primary px-2 py-1"
                >
                  Add button
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((lecture, idx) => {
                return (
                  <li className="space-y-2" key={lecture._id}>
                    <p
                      className="cursor-pointer1"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span>
                        lecture {idx + 1} : {}
                      </span>
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() => onLectureDelete(state?.id, lecture?._id)}
                        className="btn-accent"
                      >
                        delete lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
}
export default DisplayLecture;
