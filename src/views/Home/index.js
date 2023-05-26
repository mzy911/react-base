import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectors as listSelectors,
  actions as listActions,
} from "@/model/list";
import { generateActionDispatcher } from "@/utils/model/action";

const Home = ({ list, fetchList, listLoading }) => {

  return (
    <div>
      <h1>首页</h1>

      <div>加载状态：{listLoading}</div>

      <button
        type=""
        onClick={() => {
          console.log("请求数据");
          fetchList({ id: 123, page: 1 });
        }}
      >
        点击
      </button>
      {list?.data?.map((item) => {
        return (
          <div>
            {" "}
            姓名：{item.name} 年龄：{item.age}
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  (state, props) => {
    return {
      list: listSelectors.getFetchList(state),
      listLoading: listSelectors.getFetchListLoading(state),
    };
  },
  (dispatch) => {
    return {
      fetchList: generateActionDispatcher(dispatch, listActions.fetchList),
    };
  }
)(Home);
