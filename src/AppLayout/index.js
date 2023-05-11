import React, { useEffect, useState } from "react";
import { Outlet, useLocation, matchRoutes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import router from "@/router/index";
import "./index.scss";
const { Header, Content } = Layout;

const menuTree = (routes, res = []) => {
  routes.forEach((route) => {
    if (route.label && route.children) {
      const obj = {
        key: route.path,
        label: <Link to={route.path}> {route.label}</Link>,
        children: [],
      };
      res.push(obj);
      menuTree(route.children, obj.children);
    } else if (!route.label && route.children) {
      menuTree(route.children, res);
    } else if (route.label) {
      res.push({
        key: route.path,
        label: <Link to={route.path}> {route.label}</Link>,
      });
    }
  });
  return res;
};

const AppLayout = () => {
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [init, setInit] = useState(false);
  const local = useLocation();
  const menuItems = menuTree(router);

  // 检测路由的变化，高亮导航
  useEffect(() => {
    const pathArr = [];
    const breadArr = [];
    const routes = matchRoutes(router, local.pathname);

    if (routes) {
      for (let route of routes) {
        const path = route.route.path;
        const label = route.route.label;
        if (path) {
          pathArr.push(path);
          breadArr.push(label);
        }
      }
    }

    setDefaultSelectedKeys(pathArr);
    setInit(true);
  }, [local.pathname]);
  if (!init) return null;

  return (
    <Layout>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={defaultSelectedKeys}
          items={menuItems}
        />
      </Header>

      {/* 布局 */}
      <Layout
        style={{
          padding: "0 24px 24px"
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          {/* 渲染子路由内容 */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
