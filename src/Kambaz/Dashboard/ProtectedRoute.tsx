import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedCourseRoute({ children, courseId }: { children: any, courseId: string }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  //const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  //const isEnrolled = enrollments.some((course: any) => course._id === courseId);
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="" />;
  }
}