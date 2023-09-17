import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);
  return (
    <div className="text-white">
      <div>
        <h1>Your Cart</h1>
        <p>{totalItems} Course in cart</p>
        <div>
          {total > 0 ? (
            <div>
              <RenderCartCourses />
              <RenderTotalAmount />
            </div>
          ) : (
            <div>
              <p>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
