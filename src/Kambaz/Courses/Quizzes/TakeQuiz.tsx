import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { findQuizById, getQuizSubmission, submitQuizAnswers } from './client';
import { useSelector } from 'react-redux';

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [quiz, setQuiz] = useState<any>(null);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log("qid: ", qid);
        const loadQuiz = async () => {
            if (!qid) return;
            const q = await findQuizById(qid);
            setQuiz(q);
            try {
                const submission = await getQuizSubmission(qid, currentUser._id);
                setAnswers(submission.answers);
                console.log("Submissions: ", submission.numAttempts);
                console.log("Allowed attempts: ", q.numAttempts);
                if (submission.numAttempts >= q.numAttempts) {
                    alert("Too many attempts");
                    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
                }
            } catch (err) {
                console.log("No previous submission found.");
            }
        };
        loadQuiz();
    }, [qid]);

    const handleChangeAnswer = (index: number, value: any) => {
        setAnswers({ ...answers, [index]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!quiz || !qid || !currentUser) return;
    
        let score = 0;
    
        quiz.questions.forEach((question: any, idx: number) => {
            const studentAnswer = answers[idx];
    
            switch (question.type) {
                case 'multiple-choice':
                case 'true-false':
                    if (studentAnswer === question.correctOption) {
                        score += question.points;
                    }
                    break;
                case 'fill-blank':
                    const correct = question.correctAnswer?.trim().toLowerCase();
                    const userInput = (studentAnswer || '').trim().toLowerCase();
                    if (correct === userInput) {
                        score += question.points;
                    }
                    break;
            }
        });
    
        try {
            await submitQuizAnswers(qid, currentUser._id, answers);
            alert(`Quiz submitted!\nYou scored ${score} out of ${quiz.points}`);
        } catch (err) {
            console.error("Failed to submit quiz", err);
            alert("There was a problem submitting your quiz.");
        }

        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    if (!quiz) return <div>Loading quiz</div>;

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p className="text-muted">{quiz.description}</p>
            <h5>Total Points: {quiz.points}</h5>

            {quiz.questions.map((q: any, idx: number) => (
                <Card className="mb-3" key={idx}>
                    <Card.Body>
                        <Card.Title>
                            Q{idx + 1}: {q.title} ({q.points} pts)
                        </Card.Title>

                        {q.type === 'multiple-choice' && (
                            <Form>
                                {q.options.map((opt: string, i: number) => (
                                    <Form.Check
                                        key={i}
                                        type="radio"
                                        label={opt}
                                        name={`question-${idx}`}
                                        checked={answers[idx] === i}
                                        onChange={() => handleChangeAnswer(idx, i)}
                                    />
                                ))}
                            </Form>
                        )}

                        {q.type === 'true-false' && (
                            <Form>
                                {['True', 'False'].map((label, i) => (
                                    <Form.Check
                                        key={i}
                                        type="radio"
                                        label={label}
                                        name={`question-${idx}`}
                                        checked={answers[idx] === i}
                                        onChange={() => handleChangeAnswer(idx, i)}
                                    />
                                ))}
                            </Form>
                        )}

                        {q.type === 'fill-blank' && (
                            <Form.Control
                                type="text"
                                placeholder="Your answer..."
                                value={answers[idx] || ''}
                                onChange={(e) => handleChangeAnswer(idx, e.target.value)}
                            />
                        )}
                    </Card.Body>
                </Card>
            ))}

            <Button variant="primary" onClick={handleSubmit}>
                Submit Quiz
            </Button>
        </div>
    );
}
