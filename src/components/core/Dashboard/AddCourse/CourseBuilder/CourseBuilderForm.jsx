import React from 'react'
import IconBtn from "../../../../common/IconBtn";
import {setCourse, setEditCourse, setStep} from '../../../../../redux/slices/courseSlice'
import { FiPlusCircle } from "react-icons/fi";
import {BiRightArrow} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/course';
import NestedView from './NestedView';
import { useEffect } from 'react';

const CourseBuilderForm = () => {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [blankName, setBlankName] = useState('')
  const [editSectionName, setEditSectionName] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  //  useEffect(() => {
  //    console.log("UPDATED",course);
  //  }, [course]);

  console.log("course", course);


  function goBack() {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }
  
  function cancelEdit() {
    setEditSectionName(false);
    // setBlankName(null)
    setValue("sectionName","")
  }

  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast One Section");
      return
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast One leacture in each lecture");
      return;
    }

    dispatch(setStep(3));
  };

  console.log("onSubmit functioncall");

async  function onSubmit(data) {
  setLoading(true);
  let result;
  console.log("data", data);
  console.log("data-section",data.sectionName);

    
  if (editSectionName) {
    //we are editing the section name
    result = await updateSection(
      {
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      },
      token
    );
  } else {
    result = await createSection(
      {
        sectionName: data.sectionName,
        courseId: course._id,
      },
      token
    );
  }

  console.log("result-dispatch", result);
  
  // update value   
  if (result) {
    console.log("result-dispatch",result);
    dispatch(setCourse(result));
    setEditSectionName(false);
    setValue("sectionName", "");
  }

  // loading false
  setLoading(false)
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit(); 
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }
  return (
    <>
      <div className="flex flex-col gap-4 justify-start bg-richblack-800 mt-5 px-6 py-8 rounded-xl">
        <h1 className="text-xl font-semibold">Course Builder</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="sectionName">Section Name</label>
            <input
              id="sectionName"
              type="text"
              placeholder="Add a section to build your course"
              className="input-shadow"
              {...register("sectionName", { required: true })}
            />
            {errors.sectionName && <span>Section name is required!</span>}
          </div>
          <div className="flex gap-4">
            <IconBtn
              type={"submit"}
              outline={true}
              text={`${
                editSectionName ? "Edit Section Name" : "Create Section"
              }`}
              customClasses={
                "text-yellow-100 hover:text-black hover:bg-yellow-100 font-semibold border border-yellow-100 flex items-center justify-center gap-2 w-fit bg-richblack-800"
              }
            >
              <FiPlusCircle />
            </IconBtn>
            {editSectionName && (
              <button
                className="self-start flex items-center justify-center   pt-3 text-sm  rounded text-richblack-300 hover:text-richblue-300 border-b"
                onClick={cancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {course?.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )}

        {/* <NestedView handleChangeEditSectionName={handleChangeEditSectionName} /> */}

        <div className="flex justify-end gap-3 font-bold">
          <button
            className="bg-richblack-500 hover:bg-richblack-600 hover:text-richblack-50 rounded-md px-4 text-black"
            onClick={goBack}
          >
            Back
          </button>
          <IconBtn
            active={true}
            text="Next"
            customClasses={"hover:bg-yellow-100 flex items-center "}
            onclick={goToNext}
          >
            <BiRightArrow />
          </IconBtn>
        </div>
      </div>
    </>
  );
}

export default CourseBuilderForm;
