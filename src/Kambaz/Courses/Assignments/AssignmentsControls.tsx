import { BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { Button } from "react-bootstrap";

export default function AssignmentsControls() {
    return (
        <div id="wd-assignments">
            <CiSearch className="float-start fs-2" style={{ marginTop:'8px' }} />
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                    <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                    <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group
            </Button>
            
            <input placeholder="Search..."
                id="wd-search-assignment" className="me-1 float-start form-control-lg"/>
        </div>
    );
}