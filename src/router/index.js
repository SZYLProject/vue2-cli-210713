import Vue from "vue";
import Router from "vue-router";
import { Layout } from "../layout"; // 页面整体布局
// import { topRouterMap } from "./router";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
// const whiteList = ["/"];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
  {
    path: "",
    component: Layout,
    redirect: "/projectManagement/statisticalAnalysis",
    hidden: true
  },
  {
    path: "/echarts",
    name: "echarts",
    component: () => import("@/components/echarts/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "/projectManagement",
    name: "ProjectManagement",
    meta: {
      title: "项目管理",
      icon: "iconpay3"
    },
    component: Layout,
    redirect: "/projectManagement/statisticalAnalysis",
    children: [
      {
        path: "statisticalAnalysis",
        name: "StatisticalAnalysis",
        meta: {
          title: "统计分析",
          routerType: "leftmenu"
        },
        component: () => import("@/views/ProjectManagement/StatisticalAnalysis")
      }
    ]
  }
];

//注册路由
export default new Router({
  mode: "hash", // 默认为'hash'模式,之前是history(本地无法访问)
  base: "/permission/", // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap
});

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 *
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/views/login')
 * 2、component:resolve => require(['@/views/fundPosition'], resolve)
 *
 *
 *
 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？
 *
 *
 *
 */
