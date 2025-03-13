import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

export default function AssignmentControlButtons({
  assignmentId,
  onDelete,
}: {
  assignmentId: string;
  onDelete: (assignmentId: string) => void;
}) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (confirmed) {
      onDelete(assignmentId);
    }
  };

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />

      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
