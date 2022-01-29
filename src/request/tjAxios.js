import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";

// 创建axios实例
let service = axios.create({
  // baseURL: process.env.VUE_APP_URL, // api的base_url
  // baseURL:'http://172.16.117.174:5689',
  // baseURL: window.BASE_URL,
  baseURL: process.env.VUE_APP_BASE_API,

  timeout: 5000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers = {
        //请求接口返回中文都是？，需要在请求头设置即可
        // "X-Requested-With": "XMLHttpRequest",
        // Accept: "application/x-www-form-urlencoded",
        // Accept: "application/x-www-form-urlencoded",
        // Accept: 'application/x-www-form-urlencoded；charset=UTF-8',
        Authorization: "Token " + getToken("Token") //携带权限参数
      };
    }
    if (config.methods === "post") {
      config.data = {};
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code:200,接口正常返回;
     */
    const res = response.data;

    if (res.code !== 1000) {
      switch (res.code) {
        case 1001:
          Message({
            message: res.msg,
            type: "warning",
            duration: 3 * 1000
          });
          break;
        case 1004:
          Message({
            message: res.msg,
            type: "error",
            duration: 3 * 1000
          });
          break;
      }
      return response;
    } else {
      // res.code === 200,正常返回数据
      return response;
    }
  },
  error => {
    Message({
      message: error.msg,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = obj => {
  return new Promise((resolve, reject) => {
    service({
      url: obj.url,
      method: "get",
      params: obj.params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};
// export const get = obj => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(obj.url, {
//         params: obj.params
//       })
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err.data);
//       });
//   });
// };
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = obj => {
  return new Promise((resolve, reject) => {
    axios
      .post(obj.url, obj.data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};
