import { combineEpics } from "redux-observable";
import { ACTION } from "./const";
import { createEpicFromPromise } from "../../utils/model/epics";
import dataUidEnet from "@/data/list";

const epics = [
  createEpicFromPromise(
    dataUidEnet, // 请求数据
    ACTION.FETCH_LIST,
    ACTION.FETCH_LIST_OK,
    ACTION.FETCH_LIST_ERROR,
  ),
];
// export default epics;
export default combineEpics(...epics);