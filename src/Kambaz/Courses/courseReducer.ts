import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

const initialState: { courses: Course[] } = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: newCourse }) => {
      const course: Course = {
        _id: newCourse._id,
        name: newCourse.name,
        number: newCourse.number,
        startDate: newCourse.startDate,
        endDate: newCourse.endDate,
        department: newCourse.department,
        credits: newCourse.credits,
        description: newCourse.description,
        author: newCourse.author,
      };
      state.courses.push(course);
    },
    
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    
    updateCourse: (state, { payload: updatedCourse }) => {
      state.courses = state.courses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;