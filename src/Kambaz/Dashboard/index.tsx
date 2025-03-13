import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "../Courses/courseReducer";
import { useState } from "react";
import { addEnrollment, deleteEnrollment } from "../Courses/enrollmentsReducer";
import ProtectedCourseRoute from "./ProtectedRoute";

export default function Dashboard({ course, setCourse }: { course: any; setCourse: (course: any) => void }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleAddCourse = () => {
    const newCourse = {
      _id: "new-id",
      name: course.name,
      description: course.description,
    };
    dispatch(addCourse(newCourse));
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    const updatedCourse = {
      _id: course._id,
      name: course.name,
      description: course.description,
    };
    dispatch(updateCourse(updatedCourse));
  };

  const handleToggleEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleEnroll = (courseId: string) => {
    const newEnrollment = {
      _id: `${currentUser._id}-${courseId}`,
      user: currentUser._id,
      course: courseId,
    };
    dispatch(addEnrollment(newEnrollment));
  };

  const handleUnenroll = (courseId: string) => {
    const enrollmentToRemove = enrollments.find(
      (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    );
    if (enrollmentToRemove) {
      dispatch(deleteEnrollment(enrollmentToRemove._id));
    }
  };

  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((course: any) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
      );

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      <button className="btn btn-info float-end me-2"
        onClick={handleToggleEnrollments} id="wd-enrollments-click">
        Enrollments
      </button>

      {currentUser.role === "FACULTY" && (
        <h5>
          New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={handleAddCourse}> Add
          </button>
          <button className="btn btn-warning float-end me-2"
            onClick={handleUpdateCourse} id="wd-update-course-click">
            Update
          </button>
        </h5>
      )}

      {currentUser.role === "FACULTY" && (
        <>
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <h5 className="wd-dashboard-course-title overflow-y-hidden" style={{ maxHeight: 25 }}> {course.name} </h5>
                  <p className="wd-dashboard-course-description overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description} </p>
                    <ProtectedCourseRoute courseId={course._id}>
                      <Link
                        to={`/Kambaz/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <Button variant="primary">Go</Button>
                      </Link>
                    </ProtectedCourseRoute>
                  {currentUser.role === "FACULTY" && (
                    <>
                      <button onClick={(event) => {
                        event.preventDefault();
                        handleDeleteCourse(course._id);
                      }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>
                      <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end">
                        Edit
                      </button>
                    </>
                  )}

                  {currentUser.role !== "FACULTY" && (
                    <>
                      {isEnrolled(course._id) ? (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleUnenroll(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-unenroll-course-click"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnroll(course._id);
                          }}
                          className="btn btn-success float-end"
                          id="wd-enroll-course-click"
                        >
                          Enroll
                        </button>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
