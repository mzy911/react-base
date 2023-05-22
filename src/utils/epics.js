import { Observable, of, mergeMap, debounce, from, concatAll, map } from "rxjs";
import { ofType } from "redux-observable";
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import _isFunction from "lodash/isFunction";
import { generateAction } from "./action";
// import FetchBizError from "../utils/fetch-biz";
// import { actions as errorActions } from "@/model/error";

// 处理action、原理类似于 redux-thunk
function toAction(action, payload) {
  if (_isString(action)) {
    return generateAction(action, payload);
  }
  if (_isFunction(action)) {
    return action(payload);
  }
  return action;
}

// 封装 Epic 异步请求的调用
export function createEpicFromPromise(
  promisingFn,
  actionType,
  actionOk,
  actionError,
  ignoreError,
  ignoreAccessDenied = false
) {
  return (action$, store) => {
    return action$.pipe(
      ofType(actionType),
      // debounce(100),
      mergeMap(({ payload }) => {
        return from(promisingFn(payload)).pipe(
          map((result) => {
            return toAction(actionOk, { payload, result, store });
          })
        );
      })
    );
  };
}

// 导入模块
export const moduleDynamicImport = (m) => {
  return (...args) => m.then((module) => module.default.apply(null, args));
};
