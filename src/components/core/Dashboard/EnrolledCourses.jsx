import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import testingImage from '../../../assets/Images/aboutus1.webp';
import {  SlOptionsVertical } from "react-icons/sl";

const tabsName = [
  "All",
  "Pendening",
  "Completed"
];

const EnrolledCourses = () => {
  // const { token } = useSelector((state) => state.auth);
  const token = window.localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  console.log("en-token",token);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
         try {
           const response =  getUserEnrolledCourses(token)
           console.log("enrolled Course ->",response);
           setEnrolledCourses(response);
         } catch (error) {
            console.log(error.message);
         }
     }
    useEffect(() => {
      getEnrolledCourses();
    },[])
  return (
    <div>
      <div>
        <div>
          <h1 className="text-white text-xl">Enrolled Courses</h1>
        </div>
        <div className="w-full flex flex-col mx-auto text-white border border-richblack-500 rounded-md">
          {/* header */}

          <div className=" w-full  flex flex-row  bg-richblack-700 px-4 py-3 text-richblack-300">
            <p className=" w-[40%] ">Course Name</p>
            <p className="  w-[20%] ">Durations</p>
            <p className="  w-[40%] text-center md:text-start ">Progress</p>
          </div>
          {/* data */}
          <div className="flex flex-row gap-2  border border-richblack-500 px-4 py-3">
            <div className="w-[40%]  flex flex-col lg:flex-row gap-3 ">
              <img
                src={testingImage}
                alt=""
                className=" w-full md:w-[52px]  rounded-md"
              />
              <div className=" flex flex-col justify-center items-start">
                <p className="text-richblack-50">The Complete Python</p>
                <p className="text-richblack-300">Short Description</p>
              </div>
            </div>
            <div className="w-[20%] flex  items-center text-richblack-50">
              2hr 30 mins
            </div>
            <div className="w-[40%] flex gap-4 justify-between items-center">
              <div className="flex flex-col">
                <span>Progress 65%</span>
                <span>duration--</span>
              </div>
              <div className="flex justify-center items-center">
                <SlOptionsVertical />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses

{/* <div className="flex flex-row mt-5 rounded-full shadow shadow-richblack-500 gap-1   bg-richblack-800 mb-8  ">
          {
            !enrolledCourses ? (<div>
              Loading...
            </div>)
              :!enrolledCourses.length? (<p>You have not enrolled any course yet</p>)
              :(<div>
                <div>
                  <p>Course Name</p>
                  <p>Durations</p>
                  <p>Progress</p>
                </div>
                {/* start card */}
                // {
                  // enrolledCourses.map((course, index) => (
                    // <div>
                    //   <div>
                    //     <img src="" alt="" />
                    //     <div>
                    //       <p>{course.courseName}</p>
                    //       <p>{course.courseDescription }</p>
                    //     </div>
                    //   </div>

                    //   <div>
                    //     {course?.totalDuration}
                    //   </div>
                    //   </div >
              //     ))
              //   }
              // </div>)
          // }
         
        // </div> */}