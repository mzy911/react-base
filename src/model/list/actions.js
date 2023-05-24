import { ACTION } from "./const";
import { generateActionFn } from "../../utils/model/action";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // 传递type、等待页面 dispatch
  fetchList: generateActionFn(ACTION.FETCH_LIST),
};
