import { Container, ListGroup } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { RiSurveyLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }
  useEffect(() => {
    fetchAssignments();
  }, []);
  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

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
          {assignments
          .map((assignment: any) => (
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <RiSurveyLine className="me-2 fs-3" style={{ color: 'green' }}/>
                  <Container>
                    <div>
                      {currentUser.role === "FACULTY" ? (
                        <a href={`#/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`}
                          className="wd-assignment-link wd-padding-thin-sides" 
                          style={{ fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
                          {assignment.title}
                        </a>
                      ) : (
                        <span className="wd-assignment-link wd-padding-thin-sides" 
                        style={{ fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
                          {assignment.title}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="wd-padding-thin-sides" style={{ color: "red" }}>Multiple Modules</span>
                      |
                      <span className="wd-padding-thin-sides">
                        <b>Not available until </b>
                        {new Date(assignment.availableFrom).toLocaleString('en-US', { 
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
                    </div>
                    <div>
                    <span className="wd-padding-thin-sides">
                      <b>Due</b> {new Date(assignment.dueDate).toLocaleString('en-US', { 
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
                      <span className="wd-padding-thin-sides">{assignment.points} pts</span>
                    </div>
                  </Container>
                </div>
                <div className="d-flex justify-content-center ms-auto">
                <AssignmentControlButtons
                  assignmentId={assignment._id}
                  onDelete={(id) => {
                    removeAssignment(id)
                  }}
                />

                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
  