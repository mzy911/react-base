import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectors as listSelectors,
  actions as listActions,
} from "@/model/list";
import { generateActionDispatcher } from "@/utils/action";

const Home = ({ list, fetchList }) => {
  useEffect(() => {
    console.log("监听", list);
  }, [list]);

  return (
    <div>
      <h1>首页</h1>
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
    };
  },
  (dispatch) => {
    return {
      fetchList: generateActionDispatcher(dispatch, listActions.fetchList),
    };
  }
)(Home);
