import Vue from "vue";
import Router from "vue-router";
import { Layout } from "../layout"; // 页面整体布局
// import { topRouterMap } from "./router";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

// function filterTopRouterMap(name) {
//   let router = topRouterMap.find(item => {
//     return item.parentName === name;
//   });
//   return router.data; // arr
// }

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
    redirect: "/index/index",
    hidden: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
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
    path: "/index",
    name: "index",
    component: Layout,
    meta: {
      title: "首页",
      icon: "icondashboard"
    },
    noDropdown: true,
    children: [
      {
        path: "index",
        meta: {
          title: "首页",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/views/index/index")
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

//异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: "/projectManagement",
    name: "projectManagement",
    meta: {
      title: "项目管理",
      icon: "iconpay3"
    },
    component: Layout,
    children: [
      {
        path: "statisticalAnalysis",
        name: "statisticalAnalysis",
        meta: {
          title: "统计分析",
          routerType: "leftmenu"
        },
        component: () => import("@/views/ProjectManagement/StatisticalAnalysis")
      }
    ]
  },
  {
    path: "/userManager",
    name: "userManage",
    component: Layout,
    meta: {
      title: "表格数据",
      icon: "iconuser"
    },
    noDropdown: true,
    children: [
      {
        path: "userList",
        meta: {
          title: "表格数据",
          icon: "iconuser",
          routerType: "leftmenu"
        },
        component: () => import("@/views/userList/userList")
      }
    ]
  },
  {
    path: "/fundManage",
    name: "fundManage",
    meta: {
      title: "表格管理",
      icon: "iconpay3"
    },
    component: Layout,
    children: [
      {
        path: "tableCom",
        name: "tableCom",
        meta: {
          title: "表格组件",
          routerType: "leftmenu"
        },
        component: () => import("@/views/fundList/tableComs")
      },
      {
        path: "fundList",
        name: "fundList",
        meta: {
          title: "表格编辑",
          routerType: "leftmenu"
        },
        component: () => import("@/views/fundList/fundList")
      },
      {
        path: "chinaTabsList",
        name: "chinaTabsList",
        meta: {
          title: "TAB管理",
          routerType: "leftmenu"
        },
        component: () => import("@/views/fundList/chinaTabsList")
      }
    ]
  },
  {
    path: "/error",
    component: Layout,
    name: "errorPage",
    meta: {
      title: "错误页面",
      icon: "iconError"
    },
    children: [
      {
        path: "401",
        name: "page401",
        component: () => import("@/views/errorPage/401"),
        meta: {
          title: "401",
          noCache: true
        }
      },
      {
        path: "404",
        name: "page404",
        component: () => import("@/views/errorPage/404"),
        meta: {
          title: "404",
          noCache: true
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

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
