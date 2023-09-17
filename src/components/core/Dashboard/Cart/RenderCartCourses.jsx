import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from '../../../../redux/slices/cartSlice';

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  return (
    <div>
          {
              cart.map((course, map) => (
                  <>
                      <div>
                          <div><img src={course.thumbnail} alt="" />
                              <div>
                                  <p>{course.courseName}</p>
                                  <p>{course.category?.name}</p>
                                  <div>
                                      <span>4.8</span>
                                      <ReactStars
                                          count={5}
                                          size={20}
                                          edit={false}
                                          activeColor={"#ffd700"}
                                          emptyIcon={<BsStar />}
                                          halfIcon={<BsStarHalf />}
                                          filledIcon={<BsStarFill />}
                                      />
                                      <span>{ course?.ratingAndReviews?.length}Ratings</span>
                                  </div>
                              </div>
                          </div>

                          <div>
                              <button onClick={() =>dispatch(removeFromCart(course._id))}>
                                  <RiDeleteBinLine />
                                  <span>Remove</span>
                              </button>
                              <p>Rs. {course?.price }</p>
                          </div>
                      </div>
                  </>
              ))
      }
    </div>
  )
}

export default RenderCartCourses
