import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alerts/AlertContext";
const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, isAuthenticated, error, clearError } = authContext;
  useEffect(() => {
    isAuthenticated && props.history.push("/");
    if (error && error !== " authorization denied ") {
      setAlert(error, "danger");
      clearError();
    }
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("all fields are required", "danger");
    } else {
      login({ email, password });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Log In</span>
      </h1>
      <form onSubmit={handelSubmit}>
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

        <button className="btn btn-primary btn-block"> Log In </button>
      </form>
      <Link to="/register">
        {" "}
        <small> register now </small>
      </Link>
    </div>
  );
};

export default Login;
