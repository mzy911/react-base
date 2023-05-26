import React, { lazy, Suspense } from "react";
import AppLayout from "@/AppLayout";
// import { Navigate } from "react-router-dom";

// 1、解决页面刷新闪屏
// 2、Applayout 不使用懒加载
// 3、懒加载的组件，使用 Suspense 包裹
const Home = lazy(() => import(/* webpackChunkName:'home' */ "@/views/Home"));
const About = lazy(() =>
  import(/* webpackChunkName:'About' */ "@/views/About")
);
const Abserve = lazy(() =>
  import(/* webpackChunkName:'Abserve' */ "@/views/Observe")
);
const MergeAll = lazy(() =>
  import(/* webpackChunkName:'MergeAll' */ "@/views/Observe/MergeAll")
);
const MergeMap = lazy(() =>
  import(/* webpackChunkName:'MergeAll' */ "@/views/Observe/MergeMap")
);
const SwitchMap = lazy(() =>
  import(/* webpackChunkName:'SwitchMap' */ "@/views/Observe/SwitchMap")
);
const NoPage = lazy(() =>
  import(/* webpackChunkName:'NoPage' */ "@/views/NoPage")
);
const lazyLoad = (children) => {
  // 懒加载组件必须配合 Suspense 使用
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
};

const router = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // 使用Navigate进行路由的重定向
      {
        index: true,
        label: "首页",
        element: lazyLoad(<Home />),
        path: "/",
      },
      {
        label: "监听数据",
        path: "/about",
        element: lazyLoad(<About />),
      },
      {
        label: "Observe",
        path: "/observe",
        element: lazyLoad(<Abserve />),
        children: [
          {
            label: "MergeAll",
            path: "/observe/mergeAll",
            element: lazyLoad(<MergeAll />),
          },
          {
            label: "MergeMap",
            path: "/observe/mergeMap",
            element: lazyLoad(<MergeMap />),
          },
          {
            label: "SwitchMap",
            path: "/observe/switchMap",
            element: lazyLoad(<SwitchMap />),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NoPage />,
  },
];

export default router;
