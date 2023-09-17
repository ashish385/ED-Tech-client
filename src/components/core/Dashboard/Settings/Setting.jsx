import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount';
import IconBtn from "../../../common/IconBtn";

const Setting = () => {
  return (
    <>
      <div className="text-white flex flex-col gap-10 ">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex w-full flex-col gap-5 justify-center">
          {/* Change profile picture */}
          <ChangeProfilePicture />

          {/* Profile */}
          <EditProfile />

          {/* Update Password */}
          <UpdatePassword />

          {/* Delete Account */}
          <DeleteAccount />

          <div className=" ww-full flex flex-row justify-between  gap-5  py-4 rounded-lg  ">
            <div></div>
            <div className='flex gap-2'>
              {" "}
              <IconBtn
                text="Cancel"
                active={false}
                onclick={() => {
                  //   navigate("/dashboard/settings");
                }}
              ></IconBtn>
              <IconBtn
                text="Save"
                active={true}
                onclick={() => {
                  //   navigate("/dashboard/settings");
                }}
              ></IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting
