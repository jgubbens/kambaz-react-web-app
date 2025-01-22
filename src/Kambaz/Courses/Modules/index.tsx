export default function Modules() {
    return (
      <div>
        <div>
            <button>Collapse All</button>
            <button>View Progress</button>
            <select id="wd-select-one-genre">
                <option selected value="PublishAll">Publish All</option>
                <option value="Option2">Option 2</option>
                <option value="Option3">Option 3</option>
            </select>
            <button>+ Module</button>
        </div>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 3</div>
          </li>
        </ul>
      </div>
  );
}