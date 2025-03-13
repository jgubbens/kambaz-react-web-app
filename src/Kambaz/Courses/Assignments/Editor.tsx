import { useState } from 'react';
import { Form, Col, Row, Button, FormSelect } from 'react-bootstrap';
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer.ts';
import { useNavigate } from 'react-router-dom';

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();

  let assignment = assignments.find((assignment: any) => assignment._id === aid);

  if (!assignment) {
    assignment = {
      _id: 'ID',
      title: 'Title',
      course: {cid},
      description: 'Assignment Description',
      points: 12,
      dueDate: '2024-05-13T23:59',
      availableFrom: '2024-05-06T00:00',
      availableUntil: '2024-05-13T23:59',
    };
  }

  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [points, setPoints] = useState(assignment.points);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [availableFrom, setAvailableFrom] = useState(assignment.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(assignment.availableUntil);
  const course = cid;
  const navigate = useNavigate();

  const handleSave = () => {
    const updatedAssignment = {
      _id: assignment._id,
      title,
      course,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
    };
    if (assignment._id === "ID") {
      dispatch(addAssignment(updatedAssignment));
    } else {
      dispatch(updateAssignment(updatedAssignment));
    }
    console.log("Updated Assignments: ", assignments);
    console.log("added assignment: ", assignment);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div id="wd-assignments-editor" className="wd-padding-fat">
      <label htmlFor="wd-name">Assignment Name</label>
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
        <h3>Responsive forms</h3>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Points
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                min={0}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Assignment Group
            </Form.Label>
            <Col sm={8}>
              <FormSelect>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </FormSelect>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Display grade as
            </Form.Label>
            <Col sm={8}>
              <FormSelect>
                <option value="Percentage">Percentage</option>
                <option value="Decimal">Decimal</option>
              </FormSelect>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4} className="text-end">
              Submission Type
            </Form.Label>
            <Col sm={8}>
              <Form.Group className="border p-3">
                <FormSelect>
                  <option value="Online">Online</option>
                  <option value="In Person">In Person</option>
                </FormSelect>
                <Form.Label style={{ fontWeight: 'bold' }} className="wd-padding-thin">
                  Online Entry Options
                </Form.Label>
                <Form.Check type="checkbox" className="wd-padding-thin ms-3" label="Text Entry" />
                <Form.Check type="checkbox" className="wd-padding-thin ms-3" label="Website URL" />
                <Form.Check type="checkbox" className="wd-padding-thin ms-3" label="Media Recordings" />
                <Form.Check type="checkbox" className="wd-padding-thin ms-3" label="Student Annotation" />
                <Form.Check type="checkbox" className="wd-padding-thin ms-3" label="File Uploads" />
              </Form.Group>
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
