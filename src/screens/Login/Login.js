import React, { useState, useContext } from "react";
import authContext from "../../context/Authentication/authContext";
// import alertContext from "../context/alert/alertContext";
// import Alert from './Alert';

const Login = () => {
  // const ref = useRef(null)
  const context = useContext(authContext);
  const { login } = context;

  // const AlertContext = useContext(alertContext)
  // const {showAlert,alert} = AlertContext

  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="container my-4 text-light">
      {/* <div ref={ref}> */}
      {/* <Alert alert={alert}/> */}
      {/* </div> */}
      <h2 className="mb-3">Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            id="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mt-1"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>

      <h3 className="text-center mt-5">
        Hello, since we are using free servers, signing or login takes a bit of
        time, so be patient after you put in your details.
      </h3>
    </div>
  );
};

export default Login;
