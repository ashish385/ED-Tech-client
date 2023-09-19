import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import PublishCourse from "./PublishCourse";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";

const steps = [
  {
    id: 1,
    title: "Course Information",
    dotted: true,
  },
  {
    id: 2,
    title: "Course Builder",
    dotted: true,
  },
  {
    id: 3,
    title: "Publish",
    dotted: false,
  },
];

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  return (
    <>
      <div className="flex w-full items-center  ">
        {steps.map((item, index) => {
          return (
            <>
              <div key={index} className="flex flex-col items-center ">
                <div
                  className={`${
                    step === item.id
                      ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } rounded-full  flex w-[45px] h-[45px] justify-center items-center`}
                >
                  {step > item.id ? (
                    <FaCheck className="text-yellow-50 " />
                  ) : (
                    item.id
                  )}
                </div>
                {/* <span className="w-[120px]  text-center">{item.title}</span> */}
              </div>
              {/* Add code for dashed between the labels */}
              {item.dotted && (
                <>
                  <div
                    className={`${
                      step > item.id
                        ? "border-yellow-400"
                        : "border-richblack-500"
                    }  w-full border-dashed  border-t-2 border-spacing-x-8 transition-all duration-200   `}
                  ></div>
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        <p>Course Information</p>
        <p className=" mr-4 md:mr-20">Course Builder</p>
        <p>Publish</p>
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
