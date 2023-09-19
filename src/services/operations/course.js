import toast from 'react-hot-toast';
import { courseEndpoints } from '../apis';
import { apiConnector } from '../apiconnector';

const { COURSE_CATEGORIES_API,EDIT_COURSE_API,CREATE_COURSE_API } = courseEndpoints;

// fetch  categories
export async function fetchCourseCategories(token) {
    const toastId = toast.loading("Loding....")
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API, null,
            {
            Autorization :`Bearer ${token}`
            })
        console.log("INSTRUCTOR COURESE API RESPONSE ==>", response);
        // console.log("response.data",response.data);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.allCategory;
    } catch (error) {
        console.log("INSTRUCTOR COURESE API ERROR.....", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// add course details
export const addCourseDetails = async (data,token) => {
    const toastId = toast.loading("Loading...")
    console.log("token and data",token,data);
    let result = null;
    console.log("img",data.thumbnail);
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`
        })

        console.log("CREATE COURSE API RESPONSE............", response);

        if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
        }
        
        toast.success("Course Details Added Successfully")
    result = response?.data?.data
    } catch (error) {
       console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId);
    return result;
}

// Edit course
export const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loding...");
    let result = [];
    try {
        const response = await apiConnector(
            "PUT",
            EDIT_COURSE_API,
            data, {
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            }
        )

        console.log("EDIT COURSE API RESPONSE............", response);
         if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
        }

        toast.success("Course Details Updated Successfully")
         result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
         toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}