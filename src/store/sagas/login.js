// saga模块化引入
import { put, call, take, fork } from "redux-saga/effects";
import * as api from "@/api/login";
import { LOGIN_REQUEST, LOGOUT_REQUEST } from "../consts/login";
import { loginSuccess, loginFailure, logoutRequest } from "../actions/login";
import { setToken, removeToken } from "@/utils/auth";
import { push } from "react-router-redux";

function* loginRequest(data) {
  try {
    const response = yield call(api.loginMboile, data);
    if (response.status === 200) {
      let isAdmin = false;
      setToken(response.data.data);
      yield put(push("/"));
      yield put(loginSuccess(response.data.data, isAdmin, ""));
    } else {
      yield put(
        loginFailure({
          code: response.status,
          msg: response.data.message,
        })
      );
    }
  } catch (e) {
    // 接口请求失败
    yield put(
      loginFailure({
        code: 404,
        msg: e.response.data.message,
      })
    );
  }
}

function* logout() {
  yield call(api.logoutMboile);
  removeToken();
  yield put(logoutRequest());
}

export function* loginSagas() {
  while (true) {
    // 登录
    const resLogin = yield take(LOGIN_REQUEST);
    yield fork(loginRequest, resLogin.payload);

    // 登出
    const resLogout = yield take(LOGOUT_REQUEST);
    yield fork(logout, resLogout.payload);
  }
}
