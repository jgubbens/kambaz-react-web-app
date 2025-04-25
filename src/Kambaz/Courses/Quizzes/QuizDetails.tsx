import { useEffect } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuiz } from './reducer';
import * as quizzesClient from "./client.ts";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  let quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const course = cid;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatDate = (date: string) => new Date(date).toLocaleString();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const loadQuiz = async () => {
      if (qid && !quizzes.some((q: any) => q._id === qid)) {
        const fetchedQuiz = await quizzesClient.findQuizById(qid);
        dispatch(addQuiz(fetchedQuiz));
      }
    };
    loadQuiz();
  }, [qid]);

  return (
    <div>
      {currentUser.role === "FACULTY" && 
        <Container className="wd-padding-fat text-left">
          <Row className="mb-2">
            <Col sm={5} className="text-end fw-bold">
              <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                id="wd-preview-quiz-btn"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}>
                    Preview</Button>
            </Col>
            <Col sm={5}>
            <Button
                variant="danger"
                size="lg"
                className="me-1"
                id="wd-edit-quiz-btn"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}>
                    Edit Quiz</Button>
            </Col>
          </Row>
          <h2 className="mb-4">{quiz.title}</h2>
          <Container className="justify-content-center">
            <div style={{ maxWidth: "1000px", textAlign: "left" }}>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Description:</Col>
                <Col sm={6}>{quiz.description ?? "—"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Points:</Col>
                <Col sm={6}>{quiz.points ?? "—"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Type:</Col>
                <Col sm={6}>{quiz.type ?? "—"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Assignment Group:</Col>
                <Col sm={6}>{quiz.assignmentGroup ?? "—"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Shuffle Answers:</Col>
                <Col sm={6}>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Time Limit Enabled:</Col>
                <Col sm={6}>{quiz.timeLimitEnabled ? `${quiz.timeLimit} minutes` : "No limit"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Multiple Attempts Allowed:</Col>
                <Col sm={6}>{quiz.multipleAttempts ? `${quiz.numAttempts ?? '∞'}` : "No"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Show Correct Answers Immediately:</Col>
                <Col sm={6}>{quiz.showCorrectAnswersImm ? "Yes" : "No"}</Col>
              </Row>
              {!quiz.showCorrectAnswersImm && (
                <Row className="mb-2">
                    <Col sm={4} className="text-end fw-bold">Date to Show Correct Answers:</Col>
                    <Col sm={6}>{formatDate(quiz.dateShowAnswers)}</Col>
                </Row>
              )}
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Access Code:</Col>
                <Col sm={6}>{quiz.accessCode ?? "None"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">One Question At A Time:</Col>
                <Col sm={6}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Webcam Required:</Col>
                <Col sm={6}>{quiz.webcamRequired ? "Yes" : "No"}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Lock Questions After Answering:</Col>
                <Col sm={6}>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
              </Row>
              <hr />
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Due Date:</Col>
                <Col sm={6}>{formatDate(quiz.dueDate)}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Available From:</Col>
                <Col sm={6}>{formatDate(quiz.availableFrom)}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4} className="text-end fw-bold">Available Until:</Col>
                <Col sm={6}>{formatDate(quiz.availableUntil)}</Col>
              </Row>
            </div>
          </Container>
        </Container>
      }
      {currentUser.role === "STUDENT" &&
        <Container className="wd-padding-fat text-center">
          <Button
                variant="danger"
                size="lg"
                className="me-1"
                id="wd-start-quiz-btn"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}>
                    Start Quiz</Button>
        </Container>
      }
    </div>
  );
}
