import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/course";
import { FaL } from "react-icons/fa6";

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) =>state.viewCourse)

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    
    useEffect(() => {
        setValue("courseExprience", "");
        setValue("courseRating", 0);
    })

    const ratingChanged = (newRating) => {
        console.log(newRating);
        setValue("courseRating", newRating);
    };

    const onSubmit = async (data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperienc
        }, token);
        setReviewModal(false);
    }
  return (
    <>
      <div>
        {/* Modal header */}
        <div>
          <div>Add Review</div>
          <button onClick={() => setReviewModal(false)}>close</button>
        </div>

        {/* Modal Body */}
        <div>
          <div>
            <img
              src={user?.image}
              alt="user"
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p>
                {user?.firstName} {user.lastName}
              </p>
              <p>Oosting Publicily</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label htmlFor="courseExprenince">
                Add Your Course Experience
              </label>
              <textarea
                name="courseExprenince"
                id="courseExprenince"
                              placeholder="Add Your Course Experience"
                              {...register("courseExperience", { required: true })}
                              className="input-shadow"
                          />
                          {
                              errors.courseExperienc && <span>Please add your experience</span>
                          }
                      </div>
                      {/* buttons */}
                      <div>
                          <div onClick={() => setReviewModal(false)}>Cancel</div>
                          <IconBtn text={"Save"} active={true}  />
                      </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseReviewModal;
