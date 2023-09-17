import React from "react";
import IconBtn from "../common/IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-richblack-700 opacity-70"></div>
      <div className="absolute bg-richblack-800 shadow-2xl top-[10%] left-[40%] text-richblack-5 px-4 py-4 rounded-md">
        <p className="text-2xl text-center mt-3 italic font-bold">{modalData.text1}</p>
        <p className="text-richblack-300 text-center mt-2">{modalData.text2}</p>
        <div className="flex gap-3 mt-3 justify-evenly">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            active={true}
          />
          <button onClick={modalData?.btn2Handler} className="border px-7 py-2 rounded-md hover:bg-pink-300">
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
