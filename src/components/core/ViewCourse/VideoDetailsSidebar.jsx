import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseaEntireData,
    completedLectures,
    totaNoOfLecture,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = async () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      // set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set current subsection here
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseaEntireData, location.pathname,sectionId,subSectionId]);
  return (
    <>
      <div>
        {/* for buttons and heading */}
        <div>
          {/* for button */}
          <div>
            <button onClick={() => navigate("/dashboard/enrolled-courses")}>
              Back
            </button>
            <IconBtn
              text={"Add review"}
              active={true}
              onClick={() => setReviewModal(true)}
            />
          </div>
          {/* for heading or title */}
          <div>
            <p>{courseaEntireData?.courseName}</p>
            <p>
              {completedLectures?.length} / {totaNoOfLecture}
            </p>
          </div>
        </div>

        {/* for section and subsections */}
        <div>
          {courseSectionData.map((section, index) => (
            <div onClick={() => setActiveStatus(section?._id)} key={index}>
              {/* section */}
              <div>
                <div>{section?.sectionName}</div>
                {/* add arrow icon */}
              </div>

              {/* subSection */}
              <div>
                {activeStatus === section._id && (
                  <div>
                    {section?.subSection.map((subSection, index) => (
                      <div
                        key={index}
                            className={`flex gap-5 p-5 ${videoBarActive === subSection._id
                                    ? "bg-yellow-200 text-richblack-900"
                                : "bg-richblack-900 text-white"}`}
                            onClick={() =>{location(
                              `/view-course/${courseaEntireData?._id}/section/${section._id}/sub-section/${subSection._id}`
                            );
                            setVideoBarActive(subSection._id)}}
                            
                        
                              
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(subSection?._id)}
                          onChange={() => {}}
                        />
                        <p>{subSection.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
