import { Container, ListGroup } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { RiSurveyLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
    return (
      <div>
        <AssignmentsControls />
        <br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <IoMdArrowDropdown className="me-2 fs-3" />
                <b>ASSIGNMENTS</b>
              </div>
              <div className="d-flex align-items-center">
                <p className="wd-padding-thin-sides wd-thin-bubble wd-border-solid"
                  style={{ marginRight: '15px', marginTop: '15px' }}>40% of Total</p>
                <BsPlus className="fs-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <RiSurveyLine className="me-2 fs-3" style={{ color: 'green' }}/>
                  <Container>
                    <div>
                      <a href="#/Kambaz/Courses/1234/Assignments/1"
                        className="wd-assignment-link wd-padding-thin-sides" 
                        style={{ fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
                        A1
                      </a>
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides" style={{ color: "red" }}>Multiple Modules</span>
                      |
                      <span className="wd-padding-thin-sides"><b>Not available until </b> May 6 at 12:00 am</span>
                      |
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides"><b>Due</b> May 13 at 11:59 pm</span>
                      |
                      <span className="wd-padding-thin-sides">100 pts</span>
                    </div>
                  </Container>
                </div>
                <div className="d-flex justify-content-center ms-auto">
                  <AssignmentControlButtons />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <RiSurveyLine className="me-2 fs-3" style={{ color: 'green' }}/>
                  <Container>
                    <div>
                      <a href="#/Kambaz/Courses/1234/Assignments/1"
                        className="wd-assignment-link wd-padding-thin-sides" 
                        style={{ fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
                        A2
                      </a>
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides" style={{ color: "red" }}>Multiple Modules</span>
                      |
                      <span className="wd-padding-thin-sides"><b>Not available until </b> May 13 at 12:00 am</span>
                      |
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides"><b>Due</b> May 20 at 11:59 pm</span>
                      |
                      <span className="wd-padding-thin-sides">100 pts</span>
                    </div>
                  </Container>
                </div>
                <div className="d-flex justify-content-center ms-auto">
                  <AssignmentControlButtons />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <RiSurveyLine className="me-2 fs-3" style={{ color: 'green' }}/>
                  <Container>
                    <div>
                      <a href="#/Kambaz/Courses/1234/Assignments/1"
                        className="wd-assignment-link wd-padding-thin-sides" 
                        style={{ fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
                        A3
                      </a>
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides" style={{ color: "red" }}>Multiple Modules</span>
                      |
                      <span className="wd-padding-thin-sides"><b>Not available until </b> May 20 at 12:00 am</span>
                      |
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides"><b>Due</b> May 27 at 11:59 pm</span>
                      |
                      <span className="wd-padding-thin-sides">100 pts</span>
                    </div>
                  </Container>
                </div>
                <div className="d-flex justify-content-center ms-auto">
                  <AssignmentControlButtons />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
  );}
  