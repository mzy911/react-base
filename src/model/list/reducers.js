import { combineReducers } from "redux";
import { ACTION } from "./const";
import { generateLoadingReducer } from "../../utils/model/reducers";


// 处理返回的数据
export default combineReducers({
  uidFetchList: generateLoadingReducer(
    ACTION.FETCH_LIST,
    ACTION.FETCH_LIST_OK,
    ACTION.FETCH_LIST_ERROR,
    {}
  ),
});
  