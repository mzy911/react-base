import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectors as listSelectors } from "@/model/list";
import { Outlet} from "react-router-dom";

const Abserve = ({ list, fetchList }) => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default connect((state, props) => {
  return {
    list: listSelectors.getFetchList(state),
  };
})(Abserve);
