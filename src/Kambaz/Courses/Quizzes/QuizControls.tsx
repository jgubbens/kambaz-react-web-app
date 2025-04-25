import { BsPlus } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import * as coursesClient from "../client.ts";
import { addQuiz } from "./reducer.ts";

export default function QuizControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleCreateQuiz = async () => {
    if (!cid) return;
    const newQuiz = {
      title: "New Quiz",
      course: cid,
      description: "New quiz description",
      points: 0,
      dueDate: new Date().toISOString(),
      availableFrom: new Date().toISOString(),
      availableUntil: new Date().toISOString(),
      type: "Graded Quiz",
      showCorrectAnswersImm: true,
      oneQuestionAtATime: true,
      assignmentGroup: "Quizzes",
      questions: [],
      published: false,
    };
    const createdQuiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(createdQuiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${createdQuiz._id}`);
  };

  return (
    <div id="wd-quizzes">
      {currentUser.role === "FACULTY" && (
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-quiz-btn"
          onClick={handleCreateQuiz}
        >
          <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </Button>
      )}
      <input
        placeholder="Search..."
        id="wd-search-quizzes"
        className="me-1 float-start form-control-lg"
      />
    </div>
  );
}
