import axios from "axios";
import { Message } from "element-ui";
// import store from "../store";
import { getToken } from "@/utils/auth";

// 创建axios实例
let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,

  timeout: 5000 // 请求超时时间
});

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config, "config");
    if (getToken()) {
      // let each request carry token
      config.headers.token = getToken();
    }

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
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
      return response.data;
    } else {
      // res.code === 200,正常返回数据
      return response.data;
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
    console.log(obj, "obj");
    console.log(process.env.VUE_APP_BASE_URL, "VUE_APP_BASE_URL");
    service({
      url: obj.url,
      method: "get",
      params: obj.params
    })
      .then(res => {
        resolve(res.data.data);
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
