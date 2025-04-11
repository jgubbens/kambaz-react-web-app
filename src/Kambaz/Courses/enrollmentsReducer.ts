import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState: { enrollments: Enrollment[] } = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: newEnrollment }) => {
      const enrollment: Enrollment = {
        _id: newEnrollment._id,
        user: newEnrollment.user,
        course: newEnrollment.course,
      };
      state.enrollments.push(enrollment);
    },
    deleteEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment._id !== enrollmentId
      );
    },
    updateEnrollment: (state, { payload: updatedEnrollment }) => {
      state.enrollments = state.enrollments.map((enrollment) =>
        enrollment._id === updatedEnrollment._id ? updatedEnrollment : enrollment
      );
    },
  },
});

export const { setEnrollments, addEnrollment, deleteEnrollment, updateEnrollment } = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
