import { notification } from 'antd'
import { call, put, takeLatest } from 'redux-saga/effects'

import { fetch, fetchWithToken } from '../utils/fetch'
import { createAction, createActionType, createReducer } from '../utils/redux'

// assign namespace to constant creator
const create = createActionType('auth')

export const USER_LOGIN = create('USER_LOGIN')
export const USER_LOGOUT = create('USER_LOGOUT')
export const USER_LOGIN_WITH_TOKEN = create('USER_LOGIN_WITH_TOKEN')

// status
export const USER_LOGIN_ERROR = create('USER_LOGIN_ERROR')
export const USER_LOGIN_SUCCESS = create('USER_LOGIN_SUCCESS')

// create actions
export const userLogin = createAction(USER_LOGIN)
export const userLogout = createAction(USER_LOGOUT)
export const userLoginWithToken = createAction(USER_LOGIN_WITH_TOKEN)

// initial state
const initial = {
  isAuthen: false,
  // username, major, role
  profile: {}
}

// workers sagas
function* userLoginAsync(action: any) {
  try {
    const response = yield call(
      fetch,
      'auth/login/admin',
      action.payload,
      'POST'
    )
    const { status, payload } = response

    const getProfile = yield call(
      fetchWithToken,
      'admin/me',
      {},
      'GET',
      payload.token
    )
    const { profile } = getProfile.payload

    if (status === 'success') {
      notification[`success`]({
        description: 'Hi There~',
        message: 'Success'
      })

      yield put({
        payload: {
          profile,
          token: payload.token
        },
        type: USER_LOGIN_SUCCESS
      })
    } else {
      notification[`error`]({
        description: payload.message,
        message: 'Error'
      })

      yield put({ type: USER_LOGIN_ERROR })
    }
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.error('auth/reducer', e)
    yield put({ type: USER_LOGIN_ERROR })
  }
}

// user login using access token (get profile)
function* userLoginTokenAsync(action: any) {
  const token = window.localStorage.getItem('token')
  const response = yield call(fetchWithToken, 'admin/me', {}, 'GET', token)

  const { status, payload } = response

  if (status === 'success') {
    yield put({
      payload: {
        profile: payload.profile,
        token
      },
      type: USER_LOGIN_SUCCESS
    })
  } else {
    yield put({ type: USER_LOGIN_ERROR })
  }
}

// watcher sagas
export function* watcherAuth() {
  yield takeLatest(USER_LOGIN, userLoginAsync)
  yield takeLatest(USER_LOGIN_WITH_TOKEN, userLoginTokenAsync)
}

export const authReducer = createReducer(initial, (state: any) => ({
  [USER_LOGOUT]: () => {
    window.localStorage.removeItem('token')

    notification[`success`]({
      description: 'Good byeeeee~',
      message: 'Successfully Logout'
    })

    return {
      ...state,
      isAuthen: false
    }
  },
  [USER_LOGIN_ERROR]: () => {
    window.localStorage.removeItem('token')

    return {
      ...state,
      isAuthen: false
    }
  },
  [USER_LOGIN_SUCCESS]: ({
    profile,
    token
  }: {
    profile: any
    token: string
  }) => {
    window.localStorage.setItem('token', token)

    return {
      ...state,
      isAuthen: true,
      profile
    }
  }
}))
