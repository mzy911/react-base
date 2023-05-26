import {
  mergeMap,
  debounceTime,
  from,
  map,
  switchMap,
  catchError,
  of,
} from "rxjs";
import { ofType } from "redux-observable";
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import _isFunction from "lodash/isFunction";
import { generateAction } from "./action";
import FetchBizError from "../../api/fetch-biz";
import { actions as errorActions } from "@/model/error";

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

function generateObservableErrorActionFn(actions, ignore, ignoreAccessDenied) {
  return (error) => {
    // 处理 "action 对象"
    const actionArr = actions
      .map((v) => (_isFunction(v) ? v(error) : v))
      .filter((v) => v?.type);

    // 错误提示
    if (error && !ignore) {
      if (
        !(
          ignoreAccessDenied &&
          error instanceof FetchBizError &&
          error.getCode() === "AccessDenied"
        )
      ) {
        actionArr.push(errorActions.caught(error));
      }
    }

    return of(...actionArr);
  };
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
  // 成功回调
  const okFn = (payload, store) => (result) => {
    return toAction(actionOk, { payload, result, store });
  };

  // 失败回调
  const errFn = (payload, store) => {
    return generateObservableErrorActionFn(
      [
        (error) => {
          return toAction(actionError, {
            payload,
            error,
            store,
          });
        },
      ],
      ignoreError,
      ignoreAccessDenied
    );
  };

  return (action$, store) => {
    return action$.pipe(debounceTime(20)).pipe(
      ofType(actionType),
      mergeMap(({ payload }) => {
        return from(promisingFn(payload)).pipe(
          // 成功回调
          map(okFn(payload, store)),
          // 失败回调
          catchError(errFn(payload, store))
        );
      })
    );
  };
}

// 导入模块
export const moduleDynamicImport = (m) => {
  return (...args) => m.then((module) => module.default.apply(null, args));
};
