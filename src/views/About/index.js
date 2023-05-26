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
    </div>
  );
};

export default connect((state, props) => {
  return {
    list: listSelectors.getFetchList(state),
  };
})(About);
