import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/course";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import IconBtn from "../../../../common/IconBtn";
import {setStep,setCourse} from '../../../../../redux/slices/courseSlice'
import ChipInput from "./ChipInput";
import RequirementField from "./RequirementField";
import toast from "react-hot-toast";
import {COURSE_STATUS} from '../../../../../utils/constants'
import UploadImage from "./UploadImage";

const CourseInformationForm = () => {
  const dispatch = useDispatch();
  
  const {step} = useSelector((state) =>state.course)
  const [formData, setFormData] = useState('');
  
  

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector(
    (state) => state.course
  );
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  // useEffect(() => {
  //   register("courseTitle", {
  //     required: true,
  //   });
  //   console.log(handleSubmit);
  // })

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories(token);
      if (categories.length > 0) {
        setCourseCategory(categories);
      }
      setLoading(false);
    };
    // console.log("category", courseCategory);
    console.log("course ==>", course);
 
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenifits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("thumbnailImage", course.thumbnail);
    }

    getCategories();
  }, [course]);

  const isFormUpdated = () => {
       console.log("is form update function");
       const currentValues = getValues();
       if (
         currentValues.courseTitle !== course.courseName ||
         currentValues.courseShortDesc !== course.courseDescription ||
         currentValues.coursePrice !== course.price ||
         currentValues.courseTitle !== course.courseName ||
         currentValues.courseTags.toString() !== course.tag.toString() ||
         currentValues.courseBenefits !== course.whatYouWillLearn ||
         currentValues.courseCategory._id !== course.category._id ||
         currentValues.thumbnailImage !== course.thumbnail ||
         currentValues.courseRequirements.toString() !==
           course.instructions.toString()
       )
         return true;
       else return false;
     };



  const onHandleSubmit = async (data) => {
    console.log("data handle on submit", data);
    console.log("Edit Couse==",editCourse);
       if (editCourse) {
         if (isFormUpdated()) {
           const currentValues = getValues();
           const formData = new FormData();

           formData.append("courseId", course._id);
           if (currentValues.courseTitle !== course.courseName) {
             formData.append("courseName", data.courseTitle);
           }

           if (currentValues.courseShortDesc !== course.courseDescription) {
             formData.append("courseDescription", data.courseShortDesc);
           }

           if (currentValues.coursePrice !== course.price) {
             formData.append("price", data.coursePrice);
           }

           if (currentValues.courseTags !== course.tag) {
             formData.append("tag", data.courseTags);
           }
           if (currentValues.courseBenefits !== course.whatYouWillLearn) {
             formData.append("whatYouWillLearn", data.courseBenefits);
           }
           if (currentValues.thumbnailImage !== course.thumbnail) {
             formData.append("thumbnailImage", data.thumbnailImage);
           }

           if (currentValues.courseCategory._id !== course.category._id) {
             formData.append("category", data.courseCategory);
           }

           if (
             currentValues.courseRequirements.toString() !==
             course.instructions.toString()
           ) {
             formData.append(
               "instructions",
               JSON.stringify(data.courseRequirements)
             );
           }

           setLoading(true);
           const result = await editCourseDetails(formData, token);
           setLoading(false);
           if (result) {
             setStep(2);
             dispatch(setCourse(result));
           }
         } else {
           toast.error("NO Changes made so far");
         }
         console.log("PRINTING FORMDATA", formData);
         console.log("PRINTING result", result);

         return;
       }

    //create a new course
    const initialValues = {
      courseName: data.courseTitle,
      courseDescription: data.courseShortDesc,
      price: data.coursePrice,
      tag: data.courseTags,
      whatYouWillLearn: data.courseBenifits,
      category: data.courseCategory,
      instructions: JSON.stringify(data.courseRequirements),
      status: COURSE_STATUS.DRAFT,
      thumbnail: data.thumbnailImage,
    };
    console.log("initial value");
    // const formData = new FormData();
    // console.log("before formdata",formData);
    //    formData.append("courseName", data.courseTitle);
    //    formData.append("courseDescription", data.courseShortDesc);
    //    formData.append("price", data.coursePrice);
    //    formData.append("whatYouWillLearn", data.courseBenefits);
    //    formData.append("category", data.courseCategory);
    //    formData.append("instructions", JSON.stringify(data.courseRequirements));
    // formData.append("status", COURSE_STATUS.DRAFT);
    // formData.append("thumbnail", data.thumbnailImage);
    // formData.append("tag", data.courseTags)
    // console.log("After formdara",formData);
    setFormData(initialValues);
    console.log("formData", formData);

       setLoading(true);
       console.log("BEFORE add course API call");
       console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData, token);
    console.log("step",step);
    if (result) {
        
         dispatch(setStep(2));
         dispatch(setCourse(result));
    }
    console.log("step", step);
       setLoading(false);
       console.log("PRINTING FORMDATA", formData);
       console.log("PRINTING result", result);
     };
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onHandleSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        {/* Course title */}
        <div>
          <label htmlFor="courseTitle">
            Course Title<sup>*</sup>
          </label>
          <input
            name="courseTitle"
            id="courseTitle"
            placeholder="Course Title"
            {...register("courseTitle", { required: true })}
            className="input-shadow w-full mt-1"
          />
          {errors.courseTitle && <span>Course title is required!</span>}
        </div>

        {/* course short description */}
        <div>
          <label htmlFor="courseShortDesc">
            Course Short Description<sup>*</sup>
          </label>
          <textarea
            name="courseShortDesc"
            id="courseShortDesc"
            placeholder="Enter Desctripton"
            {...register("courseShortDesc", { required: true })}
            className="w-full input-shadow min-h-[140px] mt-1"
          ></textarea>
          {errors.courseShortDesc && <span>Course Desctripon required!</span>}
        </div>

        {/* course price */}
        <div className="relative w-full">
          <label htmlFor="coursePrice">
            Price<sup>*</sup>
          </label>
          <input
            name="coursePrice"
            id="coursePrice"
            placeholder="Enter course price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full input-shadow pl-9 mt-1"
          />
          <span className="absolute left-1 text-2xl top-[38px] z-[10] translate-y-[10%] text-richblack-100  rounded-full  ">
            <HiOutlineCurrencyRupee />
          </span>

          {errors.coursePrice && <span>Course title is required!</span>}
        </div>

        {/* category */}
        <div>
          <label htmlFor="courseCategory">
            Course Category <sup>*</sup>
          </label>
          <select
            name="courseCategory"
            id="courseCategory"
            defaultValue={""}
            {...register("courseCategory", { required: true })}
            className="input-shadow mt-1 w-full"
          >
            <option value="" disabled>
              Choose Category
            </option>
            {courseCategory.map((course, index) => (
              <option key={index} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.courseCategory && <span>Course Category required!</span>}
        </div>

        {/* create a custom component for handling tags input */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tag and press enter"
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* create a component for uploading and showing preview of media */}
        <UploadImage
          name="thumbnailImage"
          label="thumbnailImage"
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
        />

        {/*     Benefits of the Course */}
        <div>
          <label>
            Benefits of the course<sup>*</sup>
          </label>
          <textarea
            id="courseBenifits"
            placeholder="Enter Benefits of the course"
            {...register("courseBenifits", { required: true })}
            className="min-h-[130px] input-shadow w-full mt-1"
          />
          {errors.courseBenefits && (
            <span>Benefits of the course are required**</span>
          )}
        </div>

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          placeholder="Enter Benefits of the course"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div>
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="flex items-center gap-x-2 bg-richblack-300"
            >
              Continue Without Saving
            </button>
          )}
          <IconBtn
            type={"submit"}
            active={true}
            text={!editCourse ? "Next" : "Save Changes"}
          />
        </div>
      </form>
    </>
  );
};

export default CourseInformationForm;
