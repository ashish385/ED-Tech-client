import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";


const DeleteAccount = () => {
  return (
    <div>
      <div className=" w-[90%] flex flex-row gap-10   px-10 py-8 rounded-lg bg-pink-900  ">
        <div>
          <div className="px-4 py-4 rounded-full bg-pink-800 hover:bg-pink-700 text-pink-500">
            <RiDeleteBinLine />
          </div>
        </div>
        <div className="flex flex-col gap-3 pl-4 pr-10">
          <h1 className='text-xl'>Delete Account</h1>
          <p className="text-[12px] text-start text-richblack-5">
            Would you like to delete account?
          </p>
          <p className="text-[12px] text-richblack-5">
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
          <div className='italic text-pink-300 cursor-pointer px-1 py-2' >I want to delete my account.</div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount
