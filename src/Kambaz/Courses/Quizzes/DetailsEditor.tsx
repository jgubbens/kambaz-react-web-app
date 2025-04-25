import { useState } from 'react';
import { Form, Col, Row, Button, FormSelect } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, updateQuiz } from './reducer.ts';
import { useNavigate } from 'react-router-dom';
import * as coursesClient from "../client.ts";
import * as quizzesClient from "./client.ts";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  let quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [type, setType] = useState(quiz.type ?? "Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState(quiz.assignmentGroup ?? "Quizzes");

  
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(quiz.timeLimitEnabled ?? true);
  const [timeLimit, setTimeLimit] = useState(quiz.timeLimit ?? 20);  
  const [multipleAttempts, setMultipleAttempts] = useState(quiz.multipleAttempts ?? false);
  const [numAttempts, setNumAttempts] = useState(quiz.numAttempts ?? 3);
  const [showCorrectAnswersImm, setShowCorrectAnswersImm] = useState(quiz.showCorrectAnswersImm ?? true);
  const [dateShowAnswers, setDateShowAnswers] = useState(
    quiz.dateShowAnswers ? new Date(quiz.dateShowAnswers).toISOString().slice(0, 10) : "2025-04-25"
  );
  const [shuffleAnswers, setShuffleAnswers] = useState(quiz.shuffleAnswers ?? true);
  const [accessCode, setAccessCode] = useState<number | undefined>(
    quiz.accessCode !== undefined ? quiz.accessCode : undefined
  );
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz.oneQuestionAtATime ?? true);
  const [webcamRequired, setWebcamRequired] = useState(quiz.webcamRequired ?? false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(quiz.lockQuestionsAfterAnswering ?? false);
  
  const dispatch = useDispatch();

  if (!quiz) {
    quiz = {
      _id: 'ID',
      title: 'Title',
      course: cid,
      description: 'Quiz Description',
      points: 12,
      dueDate: '2024-05-13T23:59',
      availableFrom: '2024-05-06T00:00',
      availableUntil: '2024-05-13T23:59',
    };
  }

  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [points] = useState(quiz.points);
  const [dueDate, setDueDate] = useState(quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : "");
  const [availableFrom, setAvailableFrom] = useState(quiz.availableFrom ? new Date(quiz.availableFrom).toISOString().slice(0, 16) : "");
  const [availableUntil, setAvailableUntil] = useState(quiz.availableUntil ? new Date(quiz.availableUntil).toISOString().slice(0, 16) : "");
  const course = cid;
  const navigate = useNavigate();
  const createQuiz = async () => {
    if (!cid) return;
    const newQuiz = {
      title,
      type,
      assignmentGroup,
      course: cid,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      timeLimit,
      timeLimitEnabled,
      shuffleAnswers,
      showCorrectAnswersImm,
      dateShowAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      multipleAttempts,
      numAttempts,
    };
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    return quiz;
  };

  const handleSave = async () => {
    const updatedQuiz = {
      _id: quiz._id,
      title,
      type,
      course,
      assignmentGroup,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      timeLimit,
      timeLimitEnabled,
      shuffleAnswers,
      showCorrectAnswersImm,
      dateShowAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      multipleAttempts,
      numAttempts,
    };
    if (quiz._id === "ID") {
      await createQuiz();
    } else {
      try {
        const saved = await quizzesClient.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(saved));
      } catch (err) {
        console.error("Failed to update quiz:", err);
      }
    }
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div id="wd-quizzes-editor" className="wd-padding-fat">
      <label htmlFor="wd-name">Quiz Name</label>
      <br />
      <input
        id="wd-name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%' }}
      />
      <br />
      <br />
      <textarea
        id="wd-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', height: '200px' }}
      />
      <div id="wd-css-responsive-forms-2">
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Quiz Type
            </Form.Label>
            <Col sm={8}>
              <FormSelect value={type} onChange={(e) => setType(e.target.value)}>
                <option defaultValue="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Assignment Group
            </Form.Label>
            <Col sm={8}>
              <FormSelect value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                <option defaultValue="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECTS">PROJECTS</option>
              </FormSelect>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Options
            </Form.Label>
            <Col sm={8}>
              <Form.Check 
                type="checkbox"
                id="shuffle-answers"
                label="Shuffle Answers"
                checked={shuffleAnswers}
                onChange={(e) => setShuffleAnswers(e.target.checked)}
              />
              <Form.Check 
                type="checkbox"
                id="time-limit"
                label="Time Limit"
                checked={timeLimitEnabled}
                onChange={(e) => setTimeLimitEnabled(e.target.checked)}
              />
              {timeLimitEnabled && (
                <Form.Control 
                  type="number"
                  min={1}
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  placeholder="Enter time in minutes"
                  className="mt-2"
                />
              )}
              <Form.Check 
                type="checkbox"
                id="multiple-attempts"
                label="Allow Multiple Attempts"
                onChange={(e) => setMultipleAttempts(e.target.checked)}
                checked={multipleAttempts}
              />
              {multipleAttempts && (
                <Form.Control 
                  type="number"
                  min={2}
                  value={numAttempts}
                  onChange={(e) => setNumAttempts(Number(e.target.value))}
                  placeholder="Enter number of attempts"
                  className="mt-2"
                />
              )}
              <Form.Check 
                type="checkbox"
                id="show-answers"
                label="Show Answers Immediately"
                onChange={(e) => setShowCorrectAnswersImm(e.target.checked)}
                checked={showCorrectAnswersImm}
              />
              {!showCorrectAnswersImm && (
                <>
                <b>Date to Show Correct Answers:</b>
                <Form.Control 
                  type="date"
                  value={dateShowAnswers}
                  onChange={(e) => setDateShowAnswers(e.target.value)}
                  placeholder="Enter number of attempts"
                  className="mt-2"
                />
                </>
              )}
              <Form.Check 
                type="checkbox"
                id="one-question"
                label="One Question At a Time"
                onChange={(e) => setOneQuestionAtATime(e.target.checked)}
                checked={oneQuestionAtATime}
              />
              <Form.Check 
                type="checkbox"
                id="webcam-required"
                label="Webcam Required"
                onChange={(e) => setWebcamRequired(e.target.checked)}
                checked={webcamRequired}
              />
              <Form.Check 
                type="checkbox"
                id="lock-questions"
                label="Lock Questions After Answering"
                onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
                checked={lockQuestionsAfterAnswering}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Access code
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                placeholder="Access Code"
                value={accessCode ?? ""}
                onChange={(e) => setAccessCode(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Assign
            </Form.Label>
            <Col sm={8}>
              <Form.Group className="border p-3">
                <Form.Label style={{ fontWeight: 'bold' }} className="wd-padding-thin">
                  Assign to
                </Form.Label>
                <FormSelect>
                  <option value="Everyone">Everyone</option>
                </FormSelect>
                <Form.Label style={{ fontWeight: 'bold' }} className="wd-padding-thin">
                  Due
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Form.Group as={Row}>
                  <Col sm={6}>
                    <Form.Label style={{ fontWeight: 'bold' }} className="wd-padding-thin">
                      Available from
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={availableFrom}
                      onChange={(e) => setAvailableFrom(e.target.value)}
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label style={{ fontWeight: 'bold' }} className="wd-padding-thin">
                      Until
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={availableUntil}
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Form.Group>
            </Col>
          </Form.Group>
          <Button
            className="float-end ms-1"
            variant="outline-dark"
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button className="float-end ms-3" variant="outline-dark" style={{ backgroundColor: 'lightgray' }}
              onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
}
