import { Form, Col, Row, Button, FormSelect } from "react-bootstrap";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((assignment) => assignment._id === aid);
  return (
    <div id="wd-assignments-editor" className="wd-padding-fat">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" value={assignment.title} style={{ width:'100%' }} /><br /><br />
      <textarea id="wd-description" style={{ width:'100%', height: '200px' }} >
        The assignment is available online....
      </textarea>

      <div id="wd-css-responsive-forms-2">
              <h3>Responsive forms</h3>
              <Form>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4} className="text-end"> Points </Form.Label>
                      <Col sm={8}>
                          <Form.Control type="email" value="100" />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4} className="text-end"> Assignment Group </Form.Label>
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
                      <Form.Label column sm={4} className="text-end"> Display grade as </Form.Label>
                      <Col sm={8}>
                          <FormSelect>
                            <option value="Percentage">Percentage</option>
                            <option value="Decimal">Decimal</option>
                          </FormSelect>
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4} className="text-end"> Submission Type </Form.Label>
                      <Col sm={8}>
                        <Form.Group className="border p-3">
                          <FormSelect>
                            <option value="Online">Online</option>
                            <option value="In Person">In Person</option>
                          </FormSelect>
                          <Form.Label style={{ fontWeight: 'bold' }}
                            className='wd-padding-thin'> Online Entry Options </Form.Label>
                          <Form.Check type="checkbox" className='wd-padding-thin ms-3' label="Text Entry"
                            name="check"/>
                          <Form.Check type="checkbox" className='wd-padding-thin ms-3' label="Website URL"
                            name="check"/>
                          <Form.Check type="checkbox" className='wd-padding-thin ms-3' label="Media Recordings"
                            name="check"/>
                          <Form.Check type="checkbox" className='wd-padding-thin ms-3' label="Student Annotation"
                            name="check"/>
                          <Form.Check type="checkbox" className='wd-padding-thin ms-3' label="File Uploads"
                            name="check"/>
                        </Form.Group>
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4} className="text-end"> Assign </Form.Label>
                      <Col sm={8}>
                        <Form.Group className="border p-3">
                          <Form.Label style={{ fontWeight: 'bold' }}
                            className='wd-padding-thin'>Assign to</Form.Label>
                          <FormSelect>
                            <option value="Everyone">Everyone</option>
                          </FormSelect>
                          <Form.Label style={{ fontWeight: 'bold' }}
                            className='wd-padding-thin'> Due </Form.Label>
                            <Form.Control
                              type="datetime-local"
                              value="2024-05-13T23:59"
                              onChange={(e) => console.log(e.target.value)} // Example of handling change
                            />
                          <Form.Group as={Row}>
                            <Col sm={6}>
                              <Form.Label style={{ fontWeight: 'bold' }}
                                className='wd-padding-thin'> Available from </Form.Label>
                              <Form.Control
                                type="datetime-local"
                                value="2024-05-06T00:00"
                                onChange={(e) => console.log(e.target.value)} // Example of handling change
                              />
                            </Col>
                            <Col sm={6}>
                              <Form.Label style={{ fontWeight: 'bold' }}
                                className='wd-padding-thin'> Until </Form.Label>
                              <Form.Control
                                type="datetime-local"
                                value="2024-05-13T23:59"
                                onChange={(e) => console.log(e.target.value)} // Example of handling change
                              />
                            </Col>
                          </Form.Group>
                          
                        </Form.Group>
                      </Col>
                  </Form.Group>
                  <a href={`#/Kambaz/Courses/${cid}/Assignments`}>
                    <Button className="float-end ms-1" variant="outline-dark"
                      style={{ backgroundColor:'red', color:'white' }}>Save</Button>
                    <Button className="float-end ms-3" variant="outline-dark"
                      style={{ backgroundColor:'lightgray' }}>Cancel</Button>
                  </a>
              </Form>
          </div>
    </div>
  );
}  