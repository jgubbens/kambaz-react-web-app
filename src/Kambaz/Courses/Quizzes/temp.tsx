import { Container, ListGroup } from "react-bootstrap";
import QuizControlButtons from "./QuizControlButtons";
import QuizControls from "./QuizControls";
import { BsGripVertical } from "react-icons/bs";
import { RiSurveyLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, deleteQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useEffect } from "react";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  }
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const onPublishToggle = async (quizId: string) => {
    console.log("index toggle publish");
    const updatedQuiz = await quizzesClient.togglePublish(quizId);
    const updatedQuizzes = quizzes.map((quiz: any) => {
      if (quiz._id === quizId) {
        return { ...quiz, published: !quiz.published };
      }
      return quiz;
    });
    dispatch(setQuizzes(updatedQuizzes));
  }

  const getQuizStatus = (quiz: any) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);
    if (availableFrom > now) {
      return `Not available until ${availableFrom.toLocaleString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}`;
    } else if (availableUntil < now) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const getGrade = async (qid: string) => {
    try {
        const submission = await quizzesClient.getQuizSubmission(qid, currentUser._id);
        console.log(submission);
        return submission.grade;
    } catch (err) {
        return("No previous submission found.");
    }
  }

  const filteredQuizzes =
    currentUser.role === "FACULTY"
      ? quizzes
      : quizzes.filter((quiz: any) => quiz.published);

  return (
    <div>
      <QuizControls />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-3" />
              <b>Assignment Quizzes</b>
            </div>
          </div>
          {filteredQuizzes
          .map((quiz: any) => (
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <RiSurveyLine className="me-2 fs-3" style={{ color: 'green' }}/>
                  <Container>
                    <div>
                      <a href={`#/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                          className="wd-quiz-link wd-padding-thin-sides" 
                          style={{ fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
                          {quiz.title}
                      </a>
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides">
                        {getQuizStatus(quiz)}
                      </span>
                    </div>
                    <div>
                    <span className="wd-padding-thin-sides">
                      <b>Due</b> {new Date(quiz.dueDate).toLocaleString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric', 
                        hour: 'numeric', 
                        minute: 'numeric', 
                        second: 'numeric', 
                        hour12: true 
                      })}
                    </span>
                      |
                      <span className="wd-padding-thin-sides">{quiz.points} pts</span>
                    </div>
                  </Container>
                </div>
                <div className="d-flex justify-content-center ms-auto">
                {currentUser.role === "FACULTY" && cid &&
                  <QuizControlButtons
                    quizId={quiz._id}
                    courseId={cid}
                    onDelete={(id) => {
                      removeQuiz(id)
                    }}
                    isPublished={quiz.published}
                    onPublishToggle={onPublishToggle}
                  />
                }

                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
  