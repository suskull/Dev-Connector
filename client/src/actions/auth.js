import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_AUTH_USER_FAILURE,
  GET_AUTH_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/getAuthToken";

export const getAuthUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      console.log("hahaha", setAuthToken(localStorage.token));
    }
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${localStorage.token}`
    //     }
    // }

    const res = await axios.get("/api/auth");
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_AUTH_USER_FAILURE,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(getAuthUser());
  } catch (error) {
    //console.log(error)
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(getAuthUser());
  } catch (error) {
    //console.log(error)
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
