import { createSelector } from "reselect";
import { namespace } from "./const";

const getNsState = (state) => state[namespace];
const getEnet = createSelector(getNsState, (state) => {
  return state.uidFetchList.result;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFetchList: getEnet,
  getFetchListLoading: createSelector(
    getNsState,
    (state) => state.uidFetchList.loading
  ),
  getFetchListAccessDenied: createSelector(
    getNsState,
    (state) => !!state.uidFetchList.accessDenied
  ),
};
