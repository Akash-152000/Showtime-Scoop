import React, { useState, useContext } from "react";
import authContext from "../../context/Authentication/authContext";
// import Alert from './Alert';

const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const context = useContext(authContext);
  const { signup } = context;

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password === credentials.cPassword) {
      await signup(credentials);
    } else {
      console.log("Password and confirm password do not match");
    }
  };

  return (
    <div className="container my-4 text-light">
      {/* <div ref={ref}>
      </div> */}
      <h2 className="mb-2">Sign up to use Showtime Scoop</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="form-control mt-1"
            id="name"
            placeholder="Enter name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            min={3}
            required
          />
        </div>
        <div className="form-group mb-2">
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
        <div className="form-group mb-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mt-1"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="cPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control mt-1"
            id="cPassword"
            name="cPassword"
            value={credentials.cPassword}
            placeholder="Confirm Password"
            onChange={onChange}
            min={5}
            required
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

export default Signup;
