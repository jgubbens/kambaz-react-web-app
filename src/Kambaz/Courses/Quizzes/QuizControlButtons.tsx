import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { RiProhibitedLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function QuizControlButtons({
  quizId,
  courseId,
  onDelete,
  isPublished,
  onPublishToggle,
}: {
  quizId: string;
  courseId: string;
  onDelete: (quizId: string) => void;
  isPublished: boolean;
  onPublishToggle: (quizId: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this quiz?"
    );
    if (confirmed) {
      onDelete(quizId);
    }
  };

  const handleEdit = () => {
    navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}`);
    setShowMenu(false);
  };

  const handlePublishToggle = () => {
    onPublishToggle(quizId);
    console.log("Toggle publish");
    setShowMenu(false);
  };

  return (
    <div className="float-end position-relative">
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />

      {isPublished && (
        <GreenCheckmark />
      )}
      {!isPublished && (
        <RiProhibitedLine />
      )}

        <IoEllipsisVertical
          className="fs-4 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div
            className="position-absolute shadow-lg bg-white rounded border p-3"
            style={{ top: "100%", right: 0 }}
          >
            <ul className="list-unstyled mb-0">
              <li>
                <button
                  onClick={handleEdit}
                  className="dropdown-item text-start"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={handleDelete}
                  className="dropdown-item text-start text-danger"
                >
                  Delete
                </button>
              </li>
              <li>
                <button
                  onClick={handlePublishToggle}
                  className="dropdown-item text-start"
                >
                  {isPublished ? "Unpublish" : "Publish"}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
  );
}
