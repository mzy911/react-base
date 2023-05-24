import _isUndefined from "lodash/isUndefined";
import _isArray from "lodash/isArray";
import { STATUS_LOADING } from "./const";

export const getPayloadResult = (payload) => payload.result;

// 生成简单的 reducer 方法
export const generateSimpleReducer =
  (initialState, fns) =>
  (state = initialState, { type, payload }) => {
    const fn = fns[type];
    if (fn) {
      return fn(payload, state);
    }

    return state;
  };

// 生成加载数据的 reducer 方法，用于记录数据及其加载状态
export const generateLoadingReducer =
  (
    actionType,
    actionTypeOk,
    actionTypeError,
    initialResult,
    extraReducers,
    extraHandler,
    catchError
  ) =>
  (
    state = { loading: STATUS_LOADING.IDLE, result: initialResult },
    { type, payload }
  ) => {
    let startHandler = null;
    let okHandler = null;
    let errorHandler = null;

    if (_isArray(extraHandler)) {
      [startHandler, okHandler, errorHandler] = extraHandler;
    } else if (extraHandler) {
      okHandler = extraHandler;
    }

    let accessDenied = false;

    switch (type) {
      // 加载中
      case actionType:
        if (startHandler) {
          return startHandler(state, payload, STATUS_LOADING.LOADING);
        }
        return {
          ...state,
          loading: STATUS_LOADING.LOADING,
        };

      // 加载成功
      case actionTypeOk:

        if (okHandler) {
          return okHandler(state, payload, STATUS_LOADING.LOADED);
        }

        return {
          ...state,
          loading: STATUS_LOADING.LOADED,
          result: payload.result,
          accessDenied: false,
        };

      // 加载失败
      case actionTypeError:
        if (
          payload?.error?.getCode &&
          payload.error.getCode() === "AccessDenied"
        ) {
          accessDenied = true;
        }

        if (errorHandler) {
          return errorHandler(state, payload, STATUS_LOADING.ERROR);
        }

        if (catchError) {
          return {
            ...state,
            loading: STATUS_LOADING.ERROR,
            accessDenied,
            error: payload?.error,
          };
        }

        return {
          ...state,
          loading: STATUS_LOADING.ERROR,
          accessDenied,
        };

      default:
        if (extraReducers) {
          const fn = extraReducers[type];
          if (fn) {
            const result = fn(payload, state.result);
            if (_isUndefined(result)) {
              return state;
            }
            return {
              ...state,
              result,
              accessDenied: false,
            };
          }
        }
        return state;
    }
  };

// 任何一个 dispatch 都可以触发 UI 的错误更新
export const getUpdateState =
  (updateStateAction, initState) =>
  (state = initState, { type, payload }) => {
    if (type === updateStateAction) {
      return {
        ...state,
        ...payload,
      };
    }
    return state;
  };
