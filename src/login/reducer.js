import {notification} from "antd";
import {call, put, takeLatest} from "redux-saga/effects";

import {fetch, fetchWithToken} from "../utils/fetch";
import {createReducer, createAction, createActionType} from "../utils/redux";

// assign namespace to constant creator
const create = createActionType("auth");

export const USER_LOGIN = create("USER_LOGIN");
export const USER_LOGOUT = create("USER_LOGOUT");
export const USER_LOGIN_WITH_TOKEN = create("USER_LOGIN_WITH_TOKEN");

// status
export const USER_LOGIN_ERROR = create("USER_LOGIN_ERROR");
export const USER_LOGIN_SUCCESS = create("USER_LOGIN_SUCCESS");

// create actions
export const userLogin = createAction(USER_LOGIN);
export const userLogout = createAction(USER_LOGOUT);
export const userLoginWithToken = createAction(USER_LOGIN_WITH_TOKEN);

// initial state
const initial = {
  isAuthen: false,
  // username, major, role
  profile: {},
};

// workers sagas
function* userLoginAsync(action) {
  try {
    const response = yield call(
      fetch,
      "auth/login/admin",
      action.payload,
      "POST",
    );
    const {status, payload} = response;

    const getProfile = yield call(
      fetchWithToken,
      "admin/me",
      {},
      "GET",
      payload.token,
    );
    console.log(payload.token);
    const {profile} = getProfile.payload;

    console.log(getProfile);

    if (status === "success") {
      notification[`success`]({
        message: "Success",
        description: "Hi There~",
      });

      yield put({
        type: USER_LOGIN_SUCCESS,
        payload: {
          token: payload.token,
          profile,
        },
      });
    } else {
      notification[`error`]({
        message: "Error",
        description: payload.message,
      });

      yield put({type: USER_LOGIN_ERROR});
    }
  } catch (e) {
    console.error("auth/reducer", e);
    yield put({type: USER_LOGIN_ERROR});
  }
}

// user login using access token (get profile)
function* userLoginTokenAsync(action) {
  const response = yield call(fetchWithToken, "admin/me", {}, "GET");
  const token = window.localStorage.get("token");

  const {status, payload} = response;

  if (status === "success") {
    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: {
        profile: payload.profile,
        token,
      },
    });
  } else {
    yield put({type: USER_LOGIN_ERROR});
  }
}

// watcher sagas
export function* watcherAuth() {
  yield takeLatest(USER_LOGIN, userLoginAsync);
  yield takeLatest(USER_LOGIN_WITH_TOKEN, userLoginTokenAsync);
}

export const authReducer = createReducer(initial, state => ({
  [USER_LOGOUT]: () => {
    window.localStorage.removeItem("token");

    return {
      ...state,
      isAuthen: false,
    };
  },
  [USER_LOGIN_ERROR]: () => {
    window.localStorage.removeItem("token");

    return {
      ...state,
      isAuthen: false,
    };
  },
  [USER_LOGIN_SUCCESS]: ({profile, token}) => {
    window.localStorage.setItem("token", token);

    return {
      ...state,
      isAuthen: true,
      profile,
    };
  },
}));
