export default function ModuleEditor({
    dialogTitle,
    moduleName,
    setModuleName,
    addModule,
    show,
    handleClose
  }: {
    dialogTitle: string;
    moduleName: string;
    setModuleName: (name: string) => void;
    addModule: () => void;
    show: boolean;
    handleClose: () => void;
  }) {
    return (
      <div
        id="wd-add-module-dialog"
        className={`modal fade ${show ? "show" : ""}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {dialogTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose} // Close modal on click
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                defaultValue={moduleName}
                placeholder="Module Name"
                onChange={(e) => setModuleName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={addModule}
                type="button"
                className="btn btn-danger"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  