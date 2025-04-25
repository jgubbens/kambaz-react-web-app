import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/courses/${courseId}/quizzes`, quiz);
    return data;
};
 
export const findQuizzesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/quizzes`);
    return data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const saveQuizQuestions = async (quizId: string, questions: any[], totalPoints: number) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, {
        questions,
        points: totalPoints,
    });
    return data;
};

export const getQuizSubmission = async (quizId: string, studentId: string) => {
    const { data } = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}/submissions/${studentId}`);
    return data;
};

export const submitQuizAnswers = async (
        quizId: string,
        studentId: string,
        answers: { [key: string]: any }) => {
    const { data } = await axios.post(
        `${REMOTE_SERVER}/api/quizzes/${quizId}/submit`,
        {
            studentId,
            answers,
        },
        { withCredentials: true }
        );
    return data;
};

export const togglePublish = async (quizId: String) => {
    console.log("Toggling publish for ", quizId);
    const response = await axios.put(`${REMOTE_SERVER}/api/quizzes/${quizId}/publish`);
    console.log("Successfully toggled publish for ", quizId);
    return response.data;
}