import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
// import { LuDot } from "react-icons/lu";

const UploadImage = ({
  label,
  name,
  placeholder,
  register,
  errors,
  control,
  setValue,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    
    const handleClick = () => {
      fileInputRef.current.click();
    };

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      console.log("file",file);
      setValue("thumbnailImage", file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-col ">
          <label htmlFor={label}>
            Thumbnail
            <sup>*</sup>
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  field.onChange(e);
                  handleImageChange(e);
                }}
                className="hidden"
              />
            )}
          />
        </div>
        {!selectedImage && (
          <div
            onClick={handleClick}
            className="w-full rounded-md py-10 border border-dashed border-richblack-300 flex flex-col  justify-center items-center gap-4 bg-richblack-700 mt-1"
          >
            <div className="rounded-full p-6 bg-richblack-900">
              <AiOutlineCloudUpload className="text-3xl text-yellow-100" />
            </div>
            <p className="mx-auto w-1/2 text-center text-richblack-300 letter-spacing-4">
              Drag and drop an image, or{" "}
              <span className="text-yellow-100">Browse</span> Max 6MB each (12MB
              for videos)
            </p>
            <div className=" w-full flex justify-around text-richblack-300 font-semibold">
              <p className="flex gap-4 ">
                <span className="text-xl mt-1">*</span>
                <span> ratio 16:9</span>
              </p>
              <p className="flex gap-4 ">
                {" "}
                <span className="text-xl mt-1">*</span>Recommended size 1024x576
              </p>
            </div>
          </div>
        )}
        {selectedImage && (
          <div className="w-full rounded-md  bg-richblack-700 px-4 py-2">
            <img
              src={selectedImage}
              alt="Uploaded"
              //   width="200"
              //   height="200"
              className="rounded-md bg-cover"
            />
            <p className="text-center py-2 text-richblack-300 hover:text-richblack-100 text-lg cursor-pointer  "
            onClick={(e) =>setSelectedImage('')}>Cancel</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;
