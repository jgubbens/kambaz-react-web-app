import { Form } from "react-bootstrap";
import { Link } from "react-router";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Signin</h1>
      <Form.Control id="wd-username"
        placeholder="username"
        className="mb-2"/>
      <Form.Control id="wd-password"
        placeholder="password" type="password"
        className="mb-2"/>
      <Link id="wd-signin-btn" to="/Kambaz/Dashboard"
        className="btn btn-primary w-100 mb-2">
        Sign in
      </Link>
      <br />
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}