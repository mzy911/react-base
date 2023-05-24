// 拼装 namespace 和 action 的短类型
function composeActionType(namespace, ...args) {
  return `${namespace}:${args.join("/")}`;
}

export const generateAction = (type, payload) => ({
  type,
  payload,
});

// 1、针对所有的 AJAX 请求，以数组的形式返回 normal / ok / error
export const generateActionTypeSetCreator = (namespace) => (actionType) => {
  return [
    composeActionType(namespace, actionType),
    composeActionType(namespace, actionType, "ok"),
    composeActionType(namespace, actionType, "error"),
  ];
};

// 2、产出一个 action 方法，用于 model 的 `actions.js`
export const generateActionFn = (type) => (payload) => {
  return generateAction(type, payload);
};


// 3、用于 connect 的 dispatchXx 方法
export const generateActionDispatcher = (dispatch, actionFn) => (...args) => {
  return dispatch(actionFn(...args));
}


// 4、产出单个 action type 的创建器
export const generateActionTypeCreator = namespace => actionType => composeActionType(namespace, actionType);