import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {

  const { total,cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these courses", courses);
    // TODO: integrate ->payment gateway
  }
  return (
    <div>
      <div>
        <p>Total:</p>
        <p>Rs {total}</p>
        
        <IconBtn text={"Buy Now"} onclick={handleBuyCourse} active={true} />
      </div>
    </div>
  )
}

export default RenderTotalAmount
