import React, { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";
import { SET_ALERT, REMOVE_ALERT } from "../Types";
import * as uuid from "uuid";

const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // set alerts
  const setAlert = (msg, type) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { id, msg, type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 3500);
  };
  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
