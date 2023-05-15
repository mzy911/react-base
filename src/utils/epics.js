import { Observable } from "rxjs";
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import _isFunction from "lodash/isFunction";
import { generateAction } from "./action";
import FetchBizError from "../utils/fetch-biz";
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

// 失败回调的处理
function generateObservableErrorActionFn(actions, ignore, ignoreAccessDenied) {
  return (error) => {
    const actionArr = actions
      .map((v) => (_isFunction(v) ? v(error) : v))
      .filter((v) => v?.type);

    // 接口错误提示：例如、无权限等
    if (error && !ignore) {
      if (
        !(error instanceof FetchBizError && error.getCode() === "AccessDenied")
      ) {
        actionArr.push(errorActions.caught(error));
      }
    }

    return Observable.of(...actionArr);
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
  return (action$, store) =>
    action$
      .ofType(actionType) // 监听 action
      .debounceTime(20) // 防抖、延迟20ms
      // 将订阅最新的结果并将其合并到外部Observable并丢弃之前的请求
      .switchMap(({ payload }) => {
        // 调用axios请求
        const observable = Observable.fromPromise(promisingFn(payload));
        const multipleOk = _isArray(actionOk);

        // 成功回调
        const okFn = (result) => {
          if (!multipleOk) {
            return toAction(actionOk, { payload, result, store });
          }

          // actionOk 为数组时
          return Observable.concat(
            ...actionOk.map((v) =>
              Observable.of(
                toAction(v, {
                  payload,
                  result,
                  store,
                })
              )
            )
          );
        };

        // 失败回调
        const errFn = generateObservableErrorActionFn(
          [
            (error) =>
              toAction(actionError, {
                payload,
                error,
                store,
              }),
          ],
          ignoreError,
          ignoreAccessDenied
        );

        return observable[multipleOk ? "mergeMap" : "map"](okFn).catch(errFn);
      });
}

// 导入模块
export const moduleDynamicImport = (m) => {
  return (...args) => m.then((module) => module.default.apply(null, args));
};
