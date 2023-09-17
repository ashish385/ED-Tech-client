import React from "react";

import ProductCard from "./Cart/ProductCard";

const Wishlist = () => {
  return (
    <div>
      <div className="text-white flex flex-col">
        <h1 className="text-white">My Wishlist</h1>
      </div>
      <div className=" w-full mt-5 ">
        <p className="text-richblack-300">3 Courses in Wishlist</p>
        <div className="flex flex-col md:flex-row gap-5 w-full  border-t  border-t-richblack-300 mt-3 ">
          {/* card */}
          <div className=" w-full lg:w-[70%]">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="bg-richblack-700 text-richblack-5 w-full lg:w-[30%] h-fit my-10 px-5 py-5 rounded-md flex flex-col gap-4">
            <p className="text-richblack-300 pl-2">Total:</p>
            <h1 className="text-2xl font-bold text-yellow-100 pl-2">Rs. 4,500</h1>
            <del className="text-richblack-300 pl-2">Rs. 5000</del>
            <div className=" w-full">
              <button className=" w-full px-4 py-2 rounded-lg bg-yellow-200 hover:bg-yellow-100 text-black font-semibold scale-95">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
