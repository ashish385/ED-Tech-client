import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";
import UploadFile from "../CourseInformation/UploadFile";
import { createSubSection, updateSubSection } from "../../../../../services/operations/course";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    } = useForm();
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState('')

     useEffect(() => {
       if (view || edit) {
         setValue("lectureTitle", modalData.title);
         setValue("lectureDesc", modalData.description);
         setValue("lectureVideo", modalData.videoUrl);
       }
     }, []);
    
     const isFormUpdated = () => {
       const currentValues = getValues();
       if (
         currentValues.lectureTitle !== modalData.title ||
         currentValues.lectureDesc !== modalData.description ||
         currentValues.lectureVideo !== modalData.videoUrl
       ) {
         return true;
       } else {
         return false;
       }
     };
     const handleEditSubSection = async () => {
       const currentValues = getValues();
       let formData = new FormData();

       formData.append("sectionId", modalData.sectionId);
       formData.append("subSectionId", modalData._id);

       if (currentValues.lectureTitle !== modalData.title) {
         formData.append("title", currentValues.lectureTitle);
       }

       if (currentValues.lectureDesc !== modalData.description) {
         formData.append("description", currentValues.lectureDesc);
       }

       if (currentValues.lectureVideo !== modalData.videoUrl) {
         formData.append("video", currentValues.lectureVideo);
       }

       setLoading(true);
       //API call
       const result = await updateSubSection(formData, token);
       if (result) {
         //TODO: same check
         dispatch(setCourse(result));
       }
       setModalData(null);
       setLoading(false);
     };

     const onSubmit = async (data) => {
       if (view) return;

       if (edit) {
         if (!isFormUpdated) {
           toast.error("No changes made to the form");
         } else {
           //edit krdo store me
           handleEditSubSection();
         }
         return;
       }

       //ADD

       let formData = new FormData();
       formData.append("sectionId", modalData);
       formData.append("title", data.lectureTitle);
       formData.append("description", data.lectureDesc);
       formData.append("video", data.lectureVideo);
       setLoading(true);
       //API CALL
       const result = await createSubSection(formData, token);

       if (result) {
         //TODO: check for updation
         dispatch(setCourse(result));
       }
       setModalData(null);
       setLoading(false);
     };
  return (
    <div className="">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-richblack-600 opacity-75 "></div>
      <div className="absolute  top-8 left-[30%] bg-richblack-800 w-[40%]  h-[90vh] overflow-y-auto  rounded-lg flex flex-col gap-4 ">
        <div className="flex justify-between bg-richblack-700 px-4 py-3">
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" px-6">
          <UploadFile
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div className="flex flex-col gap-3">
            <div className="mt-2 flex flex-col gap-1">
              <label className="text-richblack-50">
                Lecture Title <sup className="text-pink-300">*</sup>
              </label>
              <input
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", { required: true })}
                className="w-full input-shadow"
              />
              {errors.lectureTitle && (
                <span className="text-pink-200">Lecture Title is required</span>
              )}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label className="text-richblack-50">
                Lecture Description <sup className="text-pink-300">*</sup>
              </label>
              <textarea
                id="lectureDesc"
                placeholder="Enter Lecture Description"
                {...register("lectureDesc", { required: true })}
                className="w-full min-h-[130px] input-shadow"
              />
              {errors.lectureDesc && (
                <span>Lecture Description is required</span>
              )}
            </div>

            {!view && (
              <div className="self-end">
                <IconBtn
                  active={true}
                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
