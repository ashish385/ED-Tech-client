import toast from 'react-hot-toast';
import { setLoading, setUser } from '../../redux/slices/profileSlice';
import { apiConnector } from '../apiconnector';
import { profileEndpoints } from '../apis';
import { logout } from './authAPI';

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints;


export function getUserDetails(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", GET_USER_DETAILS_API, token);

        console.log("User detailsI RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
        
    } catch (error) {
        console.log(error.message);
      console.log("USER DETAILS ERROR............", error)
      toast.error("Could Not get data")
    }
    dispatch(setLoading(false))
  }
    
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  console.log("start",token);
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
    console.log("result",result);
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}
