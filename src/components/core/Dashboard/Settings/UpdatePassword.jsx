import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
  return (
    <div>
      <div className=" w-[90%] flex flex-col justify-between  gap-5 px-10 py-8 rounded-lg bg-richblack-800 ">
        <div className="flex justify-between">
          <p className="text-xl font-medium">Change Password</p>
        </div>

        <div className="flex justify-between gap-x-4">
          <label className="relative w-[50%] px-6">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={oldPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setOldPassword((prev) => !prev)}
              className="absolute right-9 top-[38px] z-[10] cursor-pointer"
            >
              {oldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-[50%] px-6">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-9 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword
