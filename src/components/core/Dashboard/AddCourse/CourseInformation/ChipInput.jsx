import React, { useState } from 'react'
import { Controller } from "react-hook-form";
import { GrFormClose } from "react-icons/gr";

const ChipInput = ({
  errors,
  control,
  setValue,
}) => {
  
  const [tags, setTags] = useState([]);

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
    setValue("courseTags", [...tags, tag]);
  };


  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setValue("courseTags", newTags);
  };
  return (
    <>
      <div>
        <label htmlFor="courseTags">
          Course Tags<sup>*</sup>
        </label>
        <div className="flex flex-wrap gap-3 text-black overflow-y-auto ">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex  gap-2 items-center   bg-yellow-500 w-fit rounded-md px-2 opacity-75"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className=" rounded-full bg-yellow-600 "
              >
                <GrFormClose className="text-yellow-100" />
              </button>
            </span>
          ))}
        </div>
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              placeholder="Add tags..."
              className="w-full input-shadow mt-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  handleAddTag(e.target.value.trim());
                  e.target.value = "";
                }
                if (e.key === "," && e.target.value.trim() !== "") {
                  handleAddTag(e.target.value.trim());
                  e.target.value = "";
                }
                if (e.key === " " && e.target.value.trim() !== "") {
                  handleAddTag(e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
          )}
        />
        {errors.courseTags && <span>Course tag is required!</span>}
      </div>
    </>
  );
};

export default ChipInput