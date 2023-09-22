import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/course";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import SubSectionModal from "./SubSectionModal";
import ConfirmationsModal from "../../../../common/ConfirmationsModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);


  const [confirmationModal, setConfirmationModal] = useState("");

 async  function handleDeleteSection(sectionId) {
     const result = await deleteSection({
       sectionId,
       courseId: course._id,
       token,
     });
     console.log("delete section",result);

     if (result) {
         dispatch(setCourse(result));
     }
     setConfirmationModal(null);
  }

  async  function handleDeleteSubSection(subSectionId, sectionId) {
      const result = await deleteSubSection({ subSectionId, sectionId, token })
       if (result) {
         dispatch(setCourse(result));
       }
       setConfirmationModal(null);
  }
  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between gap-3 border-b-2 text-richblack-300">
              <div className="flex items-center gap-3">
                <RxDropdownMenu />
                <span className="text-richblack-50">{section.sectionName}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lecture of this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBinLine />
                </button>
                <span>|</span>
                <button>
                  <BiDownArrow />
                </button>
              </div>
            </summary>
            <div>
              {section?.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex justify-between items-center gap-3 border-b-2"
                >
                  <div className="flex items-center gap-3">
                    <RxDropdownMenu />
                    <span className="text-richblack-50">{data.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit />
                    </button>

                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Seletcted lecture will be deleted",
                          btn1: "Delete",
                          btn2: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))}

              <div
                className=" flex items-center justify-between w-fit mt-2 gap-1 cursor-pointer px-1 font-semibold text-yellow-50"
                onClick={() => {
                  setAddSubSection(section._id);
                  // setConfirmationModal(true);
                }}
              >
                <AiOutlinePlus className="font-semibold" />{" "}
                <span>Add Lecture</span>
              </div>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {/* show modal */}
      {confirmationModal ? (
        <ConfirmationsModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}

      {/* {confirmationModal && (
        <ConfirmationsModal modalData={confirmationModal} />
      )} */}
    </div>
  );
};

export default NestedView;
