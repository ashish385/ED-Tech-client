import toast from 'react-hot-toast';
import { setLoading, setUser } from '../../redux/slices/profileSlice';
import { apiConnector } from '../apiconnector';
import { profileEndpoints } from '../apis';
import { logout } from './authAPI';

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_API } = profileEndpoints;


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

export  function getUserEnrolledCourses(token) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
  try {
    const response = await apiConnector("POST", GET_USER_ENROLLED_API, token);

    console.log("enrolled course  details RESPONSE............", response)

    console.log(response.data.success)
    
    if (!response.data.success) {
        throw new Error(response.data.message)
      }
  } catch (error) {
     console.log(error.message);
      console.log("get enrolled courseI ERROR............", error)
      toast.error("Could Not get data")
  }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
  
}