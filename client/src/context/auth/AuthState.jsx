import React, { useReducer } from "react";
import axios from "axios";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../Types";
import SetToken from "../../utils/SetToken";

const AuthState = (props) => {
  const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    SetToken(localStorage.token);

    try {
      const response = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: response.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data });
    }
  };
  // Register User
  const register = async (data) => {
    const config = {
      headers: { "Content-Type": "Application/Json" },
    };
    try {
      const response = await axios.post("/api/users", data, config);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
  };
  // Login User
  const login = async (data) => {
    const config = {
      headers: { "Content-Type": "Application/Json" },
    };
    try {
      const response = await axios.post("/api/auth", data, config);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
  };
  // Logout
  const logOut = () => {
    dispatch({ type: LOGOUT });
  };
  // Clear Errors
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearError,
        loadUser,
        login,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
