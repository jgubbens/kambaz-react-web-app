import { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { saveQuizQuestions, findQuizById } from './client';

const QUESTION_TYPES = ['Multiple Choice', 'True/False', 'Fill in the Blank'];

export default function QuestionsEditor() {
    const { qid } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [tempQuestion, setTempQuestion] = useState<any>(null);

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

    function defaultQuestion(type: string) {
        switch (type) {
            case 'True/False':
                return {
                    type: 'true-false',
                    title: '',
                    options: ['True', 'False'],
                    correctOption: 0,
                    correctAnswer: null,
                    points: 1,
                };
            case 'Fill in the Blank':
                return {
                    type: 'fill-blank',
                    title: '',
                    correctAnswer: '',
                    options: [],
                    correctOption: null,
                    points: 1,
                };
            case 'Multiple Choice':
            default:
                return {
                    type: 'multiple-choice',
                    title: '',
                    options: ['Option 1', 'Option 2'],
                    correctOption: 0,
                    correctAnswer: null,
                    points: 1,
                };
        }
    }

    const handleAddQuestion = (type: string) => {
        const newQ = defaultQuestion(type);
        setEditingIndex(questions.length);
        setTempQuestion({ ...newQ });
    };

    const handleChangeOption = (idx: number, value: string) => {
        const updatedOptions = [...tempQuestion.options];
        updatedOptions[idx] = value;
        setTempQuestion({ ...tempQuestion, options: updatedOptions });
    };

    const handleAddOption = () => {
        setTempQuestion({ ...tempQuestion, options: [...tempQuestion.options, `Option ${tempQuestion.options.length + 1}`] });
    };

    const handleRemoveOption = (idx: number) => {
        const updatedOptions = tempQuestion.options.filter((_: String, i: Number) => i !== idx);
        let newCorrect = tempQuestion.correctOption;
        if (idx === newCorrect) newCorrect = 0;
        else if (idx < newCorrect) newCorrect -= 1;

        setTempQuestion({ ...tempQuestion, options: updatedOptions, correctOption: newCorrect });
    };

    const handleSaveQuestion = () => {
        if (editingIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editingIndex] = tempQuestion;
            setQuestions(updatedQuestions);
            setEditingIndex(null);
            setTempQuestion(null);
        }
    };

    const handleEditQuestion = (index: number) => {
        setEditingIndex(index);
        setTempQuestion({ ...questions[index] });
    };

    const handleSaveAllQuestions = async () => {
        if (qid) {
            await saveQuizQuestions(qid, questions, totalPoints);
            alert('Questions saved!');
        }
    };

    useEffect(() => {
        console.log('Loaded quiz ID:', qid);

        const loadQuiz = async () => {
            if (!qid) {
                console.log("Quiz not found")
                return;
            } else {
                console.log("Quiz Found");
            }
            const quiz = await findQuizById(qid);
            console.log("Quiz: ", quiz);
            if (quiz?.questions) {
                setQuestions(quiz.questions);
                console.log(quiz.questions);
            } else {
                console.log('Quiz has no questions field');
            }
        };
        loadQuiz();
    }, [qid]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Questions (Total Points: {totalPoints})</h4>
                <div>
                    {QUESTION_TYPES.map((type) => (
                        <Button
                            key={type}
                            variant="danger"
                            className="me-2"
                            onClick={() => handleAddQuestion(type)}
                        >
                            New {type}
                        </Button>
                    ))}
                    <Button variant="success" onClick={handleSaveAllQuestions}>
                        Save All Questions
                    </Button>
                </div>
            </div>

            {editingIndex !== null && tempQuestion && (
                <Card className="mb-3">
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Question Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={tempQuestion.title}
                                onChange={(e) => setTempQuestion({ ...tempQuestion, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                {tempQuestion.type === 'fill-blank'
                                    ? 'Correct Answer'
                                    : 'Options'}
                            </Form.Label>

                            {tempQuestion.type === 'true-false' ? (
                                ['True', 'False'].map((label, idx) => (
                                    <Row key={idx} className="align-items-center mb-2">
                                        <Col xs={1}>
                                            <Form.Check
                                                type="radio"
                                                checked={tempQuestion.correctOption === idx}
                                                onChange={() =>
                                                    setTempQuestion({ ...tempQuestion, correctOption: idx })
                                                }
                                            />
                                        </Col>
                                        <Col>{label}</Col>
                                    </Row>
                                ))
                            ) : tempQuestion.type === 'fill-blank' ? (
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the correct answer"
                                    value={tempQuestion.correctAnswer}
                                    onChange={(e) => setTempQuestion({ ...tempQuestion, correctAnswer: e.target.value })}
                                />
                            ) : (
                                <>
                                    {tempQuestion.options.map((option: string, idx: number) => (
                                        <Row key={idx} className="align-items-center mb-2">
                                            <Col xs={1}>
                                                <Form.Check
                                                    type="radio"
                                                    checked={tempQuestion.correctOption === idx}
                                                    onChange={() => setTempQuestion({ ...tempQuestion, correctOption: idx })}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => handleChangeOption(idx, e.target.value)}
                                                />
                                            </Col>
                                            <Col xs="auto">
                                                {tempQuestion.options.length > 2 && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => handleRemoveOption(idx)}
                                                    >
                                                        x
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={handleAddOption}
                                    >
                                        + Add Option
                                    </Button>
                                </>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                type="number"
                                value={tempQuestion.points}
                                onChange={(e) => setTempQuestion({ ...tempQuestion, points: parseInt(e.target.value) })}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setEditingIndex(null)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSaveQuestion}>
                                Save Question
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

            {questions.map((q, idx) => (
                <Card key={idx} className="mb-2">
                    <Card.Body>
                        <strong>Q{idx + 1}:</strong> {q.title || '(Untitled)'}
                        <div className="mt-1 text-muted">Points: {q.points}</div>
                        <Button size="sm" variant="outline-secondary" className="mt-2" onClick={() => handleEditQuestion(idx)}>
                            Edit
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
