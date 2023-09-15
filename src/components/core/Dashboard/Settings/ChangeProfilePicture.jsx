import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div>
      <div className=" w-[90%] flex flex-row justify-between  gap-5 px-10 py-8 rounded-lg bg-richblack-800 ">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[75px] rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <p className="text-xl">Change Profile Picture</p>
          <div className="flex gap-2">
            <IconBtn
              text="Change"
              active={true}
              onclick={() => {
                //   navigate("/dashboard/settings");
              }}
            ></IconBtn>
            <IconBtn
              text="Remove"
              active={false}
              onclick={() => {
                //   navigate("/dashboard/settings");
              }}
            ></IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
