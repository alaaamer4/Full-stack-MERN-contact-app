import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { register, error, clearError, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;

  useEffect(() => {
    isAuthenticated && props.history.push("/");
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    // esline-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("All Fields Must Be Filled", "danger");
    } else if (password !== password2) {
      setAlert("password is not matched", "danger");
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handelSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm your password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Enter your password"
            onChange={handelChange}
          />
        </div>
        <button className="btn btn-primary btn-block"> Confirm </button>
      </form>
    </div>
  );
};

export default Register;
