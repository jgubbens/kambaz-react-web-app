export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
            <select defaultValue="ASSIGNMENTS" id="wd-group">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
            </select><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
            <select defaultValue="Percentage" id="wd-display-grade-as">
                <option value="Percentage">Percentage</option>
                <option value="Decimal">Decimal</option>
            </select><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
            <select defaultValue="Online" id="wd-submission-type">
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
            </select><br/>
            </td>
          </tr>
          <tr>
            <td>
                Online Entry Options<br/>
                <input type="checkbox" name="check-genre" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>
                <input type="checkbox" name="check-genre" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>
                <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                <input type="checkbox" name="check-genre" id="wd-file-upoad"/>
                <label htmlFor="wd-file-upload">File Upload</label><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" value="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
            <input type="date"
                        value="2024-05-13"
                        id="wd-due-date"/><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
          </tr>
          <tr>
            <td>
                <input type="date"
                            value="2024-05-06"
                            id="wd-available-from"/><br/>
            </td>
            <td>
                <input type="date"
                            value="2024-05-13"
                            id="wd-available-until"/><br/>
            </td>
          </tr>
          <tr>
            <button>Cancel</button>
            <button>Save</button>
          </tr>
        </table>
      </div>
  );
}  