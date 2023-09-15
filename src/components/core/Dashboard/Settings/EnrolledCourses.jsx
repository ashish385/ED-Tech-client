import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from '../../../../services/operations/profileAPI';

const tabsName = [
  "All",
  "Pendening",
  "Completed"
];

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);

  const [EnrolledCourses, setEnrolledCourses] = useState(null);
  const [currentTab, setCurrentTab] = useState(tabsName[0]);

    const getEnrolledCourses = async () => {
         try {
           const response = await getUserEnrolledCourses(token)
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
        <h1 className='text-white'>Enrolled Courses</h1>
      </div>
      <div>
        <div className="flex flex-row mt-5 rounded-full shadow shadow-richblack-500 gap-1   bg-richblack-800 mb-8  ">
         
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses
