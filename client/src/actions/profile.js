import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES,
  GET_PROFILES_FAILURE,
  GET_PROFILE_BY_ID,
  GET_PROFILE_BY_ID_FAILURE, GET_REPOS_FAILURE, GET_REPOS, LOADING_TRUE,CLEAR_PROFILES
} from "./types";
import { setAlert } from "../actions/alert";

export const getLoginedUserProfile = () => async (dispatch) => {

  dispatch({
    type: CLEAR_PROFILES
  })
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createUserProfile = (formData, history, edit = false) => async (
  dispatch
) => {

  dispatch({
    type: LOADING_TRUE
  })
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/dashboard");

    // if(!edit) {
    // }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? "Experience Updated" : "Experience Created", "success")
    );

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEducation = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? "Education Updated" : "Education Created", "success")
    );

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can Not be undone")) {
    try {
      const res = await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(setAlert(res.data.message, "success"));
    } catch (error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: {
          msg: error?.response?.statusText,
          status: error?.response?.status,
        },
      });
    }
  }
};

export const getProfiles = () => async (dispatch) => {
    // dispatch({
    //   type:CLEAR_PROFILE
    // })
  try {
    const res = await axios.get("/api/profile/all");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: GET_PROFILES_FAILURE,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const getProfileById = (id) => async dispatch => {
  try {
      const res = await axios.get(`/api/profile/user/${id}`)
    
      console.log('hahah',res.data)
      dispatch({
          type:GET_PROFILE_BY_ID,
          payload: res.data
      })
  } catch (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_PROFILE_BY_ID_FAILURE,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};


export const getRepos = username => async dispatch => {

  try {
    const res = await axios.get(`/api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_REPOS_FAILURE,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
}