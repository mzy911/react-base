import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectors as listSelectors } from "@/model/list";

const About = ({ list, fetchList }) => {
  useEffect(() => {
    console.log("监听", list);
  }, [list]);

  return (
    <div>
      <h1>操作</h1>
      {list?.data?.map((item) => {
        return (
          <div key={item.name}>
            {" "}
            姓名：{item.name} 年龄：{item.age}
          </div>
        );
      })}
    </div>
  );
};

export default connect((state, props) => {
  return {
    list: listSelectors.getFetchList(state),
  };
})(About);
