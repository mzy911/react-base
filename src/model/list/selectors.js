import { createSelector } from "reselect";
import { namespace } from "./const";

const getNsState = (state) => state[namespace];
const getEnet = createSelector(getNsState, (state) => state.uidFetchList.result);

export default {
  getFetchListLoading: createSelector(
    getNsState,
    (state) => state.uidFetchList.loading
  ),
  getFetchList: getEnet,
  getFetchListAccessDenied: createSelector(
    getNsState,
    (state) => !!state.uidFetchList.accessDenied
  )
};
