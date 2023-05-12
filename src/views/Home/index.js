import React from "react";
import { Button } from "antd";
import {connect} from 'react-redux';
import {loginRequest, logoutRequest} from '@/store/actions/login'

const Home = ({login, logout}) => {
  return <div>
    <Button onClick={()=>{login({})}} type="primary">登陆</Button>
    <Button onClick={()=>{logout({})}} style={{marginLeft:'20px'}} type="primary">登出</Button>
  </div>
};

export default connect(
  state => state.loginReducer,
  (dispatch)=>({
    login:(data)=>{
      dispatch(loginRequest(data))
    },
    logout:(data)=>{
      dispatch(logoutRequest())
    }
  })
)(Home);