import { BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function AssignmentsControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-assignments">
      <CiSearch className="float-start fs-2" style={{ marginTop: "8px" }} />
      {currentUser.role === "FACULTY" && (
        <Link to="new">
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment-btn"
          >
            <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        </Link>
      )}
      <input
        placeholder="Search..."
        id="wd-search-assignment"
        className="me-1 float-start form-control-lg"
      />
    </div>
  );
}
