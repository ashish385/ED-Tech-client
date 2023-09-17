import React from 'react';
import ReactStars from "react-rating-stars-component";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

const ProductCard = () => {
  return (
    <div>
      <div className=" w-full flex flex-col lg:flex-row gap-2 lg:gap-4 border-b border-b-richblack-300   text-richblack-5 px-6 py-5 lg:py-10">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-full lg:w-[185px] rounded-md"
        />
        <div className="w-full text-richblack-5 flex flex-col gap-2">
          <h1 className=" font-medium  ">
            The Complete Python Bootcamp From Zero to Hero in Python
          </h1>
          <p className="text-richblack-300">Name</p>
          <div className="flex flex-row gap-1 font-bold text-yellow-400">
            <span>4.8</span>
            <ReactStars
              count={5}
              size={20}
              edit={true}
              activeColor={"#ffd700"}
              emptyIcon={<BsStar />}
              halfIcon={<BsStarHalf />}
              filledIcon={<BsStarFill />}
            />
            <span className="text-sm text-richblack-300">(Review Count)</span>
          </div>
          <div className="mt-2 text-[15px] w-full text-richblack-300">
            Total Courses • Lesson • Beginner
          </div>
        </div>
        <div className="flex flex-row lg:flex-col justify-between md:justify-start md:gap-5 items-center">
          <button className="flex items-center gap-2 px-4 py-2  rounded-lg bg-yellow-200 hover:bg-yellow-100 text-black font-semibold scale-95">
            <RiDeleteBinLine />
            <span>Remove</span>
          </button>
          <p className="text-xl font-bold text-yellow-200">Rs. 1700</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard
