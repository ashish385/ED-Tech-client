import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseaEntireData: [],
  completedLectures: [],
  totaNoOfLecture: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState: initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntireData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setTotalNoOfLecture: (state, action) => {
      state.totaNoOfLecture = action.payload;
    },
    setCompletedLecture: (state, action) => {
      state.completedLectures = action.payload;
    },
    updatedCompletedLecture: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

export const {
  setCourseSectionData,
  setCompletedLecture,
  setCourseEntireData,
  setTotalNoOfLecture,
  updatedCompletedLecture,
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
