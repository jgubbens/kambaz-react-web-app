import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedCourseRoute from "./ProtectedRoute";

export default function Dashboard({ course, setCourse, courses, allCourses, addNewCourse, deleteCourse, 
    updateCourse, enrolling, setEnrolling, updateEnrollment}: { 
      course: any; setCourse: (course: any) => void ; courses: any[]; allCourses: any[]; addNewCourse: (courseData: any) => Promise<void>;
      deleteCourse: (courseId: string) => Promise<void>; updateCourse: (courseData: any) => Promise<void>; 
      enrolling: boolean; setEnrolling: (enrolling: boolean) => void; updateEnrollment: (courseId: string, enrolled: boolean) => void
      }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  //const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  //const dispatch = useDispatch();

  const handleAddCourse = async () => {
    await addNewCourse({});
  };

  const handleDeleteCourse = (courseId: string) => {
    deleteCourse(courseId);
  };

  const handleUpdateCourse = () => {
    const updatedCourse = {
      _id: course._id,
      name: course.name,
      description: course.description,
    };
    updateCourse(updatedCourse);
  };

  //const filteredCourses = enrolling ? allCourses : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
        {enrolling ? "My Courses" : "All Courses"}
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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => ( //substitute for filteredCourses
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <h5 className="wd-dashboard-course-title overflow-y-hidden" style={{ maxHeight: 25 }}> 
                    {course.name} 
                  </h5>
                  <p className="wd-dashboard-course-description overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description} </p>
                    {!enrolling && (
                      <ProtectedCourseRoute courseId={course._id}>
                        <Link
                          to={`/Kambaz/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                          <Button variant="primary">Go</Button>
                        </Link>
                      </ProtectedCourseRoute>
                    )}
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

                    {(enrolling != false) && (
                      <button  onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled);
                        }}
                        className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
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
