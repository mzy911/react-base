import { generateActionTypeSetCreator } from "../../utils/model/action";


// 当前模块前缀
const namespace = "@list";
const createActionTypeSet = generateActionTypeSetCreator(namespace);


// 请求list数据的动作
const [FETCH_LIST, FETCH_LIST_OK, FETCH_LIST_ERROR] = createActionTypeSet("fetch-list");


// 向外暴漏 ACTION
const ACTION = {
  FETCH_LIST, // '@list:fetch-list'
  FETCH_LIST_OK, // '@list:fetch-list/ok'
  FETCH_LIST_ERROR, // '@list:fetch-list/error'
};

export { namespace, ACTION };
