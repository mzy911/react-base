import { combineEpics } from "redux-observable";
import { ACTION } from "./const";
import { createEpicFromPromise } from "../../utils/epics";
import dataUidEnet from "@/data/list";

const epics = [
  createEpicFromPromise(
    dataUidEnet, // 请求数据
    ACTION.FETCH_UID_ENET,
    ACTION.FETCH_UID_ENET_OK,
    ACTION.FETCH_UID_ENET_ERROR
  ),
];
export default combineEpics(...epics);