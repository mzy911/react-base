import React from "react";
import {connect} from 'react-redux';

const About = ({ id_token}) => {
  
  return <div>
    <div>{id_token? '已登陆':'未登录'}</div>
  </div>
};


export default connect(
  state => state.loginReducer,
)(About);