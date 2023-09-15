import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import CountryCode from "../../../../data/countrycode.json";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div>
      {/* section 3 */}
      <div className=" w-[90%] flex flex-col  gap-5 px-10 py-8 rounded-lg bg-richblack-800 ">
        <div className="flex justify-between">
          <p className="text-xl font-medium">Profile Information</p>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="w-[50%] flex flex-col gap-1  px-4">
              <p className="text-richblack-500">Display Name</p>
              <input
                type="text"
                placeholder="Ashish Soni"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
              <span className="text-richblack-600 text-[14px]">
                Name entered above will be used for all issued certifies.
              </span>
            </div>
            <div className="w-[50%] flex flex-col gap-1  px-4">
              <p className="text-richblack-500">Profession</p>
              <input
                type="text"
                placeholder="Developer"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="w-[50%] flex flex-col gap-1  px-4">
              <p className="text-richblack-500">Date of Birth</p>
              <input
                type="date"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
            </div>
            <div className="w-[50%] flex flex-col gap-1  px-4">
              <p className="text-richblack-500">Gender</p>
              <input
                type="text"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="w-[50%] flex flex-col gap-1  px-4">
              <p className="text-richblack-500">
                Phone Number <span className="text-pink-500">*</span>
              </p>
              <div className="flex flex-row gap-2">
                {/*dropDown  */}
                <div className="flex w-[100px] gap-5">
                  <select
                    name="dropdown"
                    id="dropdown"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 "
                  >
                    {CountryCode.map((element, index) => {
                      return (
                        <option
                          key={index}
                          value={element.code}
                          className="bg-richblack-700 text-richblack-5"
                        >
                          <span className="py-5">
                            {element.code} ...{element.country}
                          </span>
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full">
                  <input
                    type="number"
                    id="phoneNo"
                    name="phoneNo"
                    placeholder="12345678"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                  />
                </div>
              </div>
            </div>
            <div className="w-[50%] flex flex-col gap-1  px-4">
              <p className="text-richblack-500">About</p>
              <input
                type="text"
                placeholder="Enter Bio Details"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile
