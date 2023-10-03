import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/course";
import { updatedCompletedLecture } from "../../../redux/slices/viewCourseSlice";
import { Player } from "video-react";
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from "../../common/IconBtn";



const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
     const {
       courseSectionData,
       courseaEntireData,
       completedLectures,
       totaNoOfLecture,
    } = useSelector((state) => state.viewCourse);
    
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const setVideoSpecificDetails = async () => {
        if (!courseSectionData) return;

        if (!courseId && !sectionId && !subSectionId) {
          navigate("/dashboard/enrolled-courses");
        } else {
          // let assume all 3 fields are present
          const filteredData = courseSectionData.filter(
            (course) => course._id === sectionId
          );

          const filteredVideoData = filteredData?.[0].subSection.filter(
            (data) => data._id === subSectionId
          );

          setVideoData(filteredVideoData[0]);
          setVideoEnded(false);
        }
      };
      setVideoSpecificDetails();
    }, [
      courseSectionData,
      courseaEntireData,
      location.pathname,
      sectionId,
      subSectionId,
    ]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        } else {
            return false;
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
          (data) => data._id === sectionId
        );

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[
          currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSection - 1) {
            return true;
        } else {
            return false
        }
    }

    const gotoNextVideo = () => {
         const currentSectionIndex = courseSectionData.findIndex(
           (data) => data._id === sectionId
         );

         const noOfSubSection =courseSectionData[currentSectionIndex].subSection.length;
         const currentSubSectionIndex = courseSectionData[
           currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);
        
        if (currentSubSectionIndex !== 0 ) {
            // same section ki previous video
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
            // next video pr jao
            navigate(`/new-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        } else {
            // next section ki first video
            const nextSectionId = courseSectionData[currentSectionIndex +1];
            const nextSubSectionId = courseSectionData[nextSectionId].subSection[0]._id
            // navigate next video
            navigate(
              `/new-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }
    }

    const gotoPrevieousVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
          (data) => data._id === sectionId
        );

        const noOfSubSection =
          courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[
          currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSubSectionIndex !== noOfSubSection - 1) {
          // same section ki next video
          const previousSubSectionId =
            courseSectionData[currentSectionIndex].subSection[
              currentSectionIndex - 1
            ]._id;
          // next video pr jao
          navigate(
            `/new-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
          );
        } else {
          // different section ki first video
            const previousSectionId = courseSectionData[currentSectionIndex - 1];
            const previousSubSectionLength = courseSectionData[previousSectionId].subSection.length
          const previousSubSectionId =
            courseSectionData[previousSectionId - 1].subSection[
              previousSubSectionLength
            -1 ]._id;
          // navigate next video
          navigate(
            `/new-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`
          );
        }
    }

    const handleVideoCompletion = async() => {
        setLoading(true);
        const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
        // update state
        if (res) {
            dispatch(updatedCompletedLecture(subSectionId));
        }
        setLoading(false);
    }
  return (
    <>
      <div>
        {!videoData ? (
          <div>Data Not Found</div>
        ) : (
          <div>
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData.videoUrl}
            >
                              <AiFillPlayCircle />
                              {videoEnded && (
                                  <div>
                                      {
                                          completedLectures?.includes(subSectionId) && (
                                              <IconBtn text={!loading?"Mark as completed":"Loading.."} disabled={loading} onclick={() =>handleVideoCompletion()} />
                                          )
                                      }

                                      <IconBtn disabled={loading} onclick={() => {
                                          if (playerRef?.current) {
                                              playerRef.current?.seek(0);
                                              setVideoEnded(false)
                                          }
                                      }} text={"Rewatch"} />
                                      
                                      <div>
                                          {
                                              !isFirstVideo() && (
                                                  <div>
                                                      <button disabled={loading} onClick={gotoPrevieousVideo} className="black-button">
                                                          Prev
                                                      </button>
                                                  </div>
                                              )
                                          }
                                          {
                                              !isLastVideo() && (
                                                  <div>
                                                      <button disabled={loading} onClick={gotoNextVideo} className="black-button">
                                                          Next
                                                      </button>
                                                  </div>
                                              )
                                          }
                                      </div>
                                  </div>
                              )}
            </Player>
          </div>
              )}
              <h1>{videoData?.title}</h1>
              <p>{videoData.description }</p>
      </div>
    </>
  );
};

export default VideoDetails;
