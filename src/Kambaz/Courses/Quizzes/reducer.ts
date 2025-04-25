import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points: number;
  dueDate: string | null;
  availableFrom: string;
  availableUntil: string;
  courseId?: string;
}

const initialState: { quizzes: Quiz[] } = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes.push(quiz);
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a) => a._id !== quizId
      );
    },
    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((a) =>
        a._id === updatedQuiz._id ? updatedQuiz : a
      );
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((a) =>
        a._id === quizId ? { ...a, editing: true } : a
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
