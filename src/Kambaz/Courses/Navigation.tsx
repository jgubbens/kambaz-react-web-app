import { Link, useLocation } from "react-router-dom";
import { courses } from "../Database";
import { useParams } from "react-router";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const location = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kambaz/Courses/${course._id}/${link}`} id="wd-course-home-link"
        className={`list-group-item ${location.pathname === `/Kambaz/Courses/${course._id}/${link}` ? 'active' : 'text-danger'} border border-0`}> {link} </Link>
      ))}
    </div>
  );
}