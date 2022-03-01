import request from "@/request/tjAxios";
import { get, post } from "@/request/tjAxios";
import { getProjectIdSession } from "@/utils/auth";
const porjectId = getProjectIdSession();
// export function FenLeiBianLiangMiaoShuTongJi(params) {
//   return request({
//     url: "/FenLeiBianLiangMiaoShuTongJi",
//     method: "get",
//     params: params
//   });
// }
// export function fenZuTongJi(data) {
//   return request({
//     url: "/fenZuTongJi?name=trt",
//     method: "post",
//     params: data
//   });
// }
const statisticalAnalysis = {
  // FenLeiBianLiangMiaoShuTongJi(params) {
  //   return get({ url: "/FenLeiBianLiangMiaoShuTongJi", params: params });
  // },
  // fenZuTongJi(data) {
  //   return post({ url: `/fenZuTongJi?name=${data.name}`, data: data.data });
  // },

  /*************************************一般描述接口*********************************/

  GetVariables(parmas) {
    return request({
      url: `/api/GetVariables?projectId=${porjectId}`,
      parmas: parmas,
      method:'GET'
    });
  },
  yiBanXingMiaoShu(parmas) {
    return request({
      url: `/api/yiBanXingMiaoShu?projectId=${porjectId}&variableCode=${parmas.variableCode}`,
      parmas: parmas,
      method:"GET"
    });
  },
  // yiBanXingMiaoShu1(params){
  //   return request({
  //     url: "/api/yiBanXingMiaoShu",
  //     method: "post",
  //     params: params
  //   })
  // }

  /*************************************比较接口：*********************************/
  // 正态性检验
  zhengTaiJianYan(parmas) {
    return request({
      url: `/api/zhengTaiJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas,
      method:'GET'
    });
  },
  // 方差齐性检验
  fangChaQiXingJianYan(parmas) {
    return request({
      url: `/api/fangChaQiXingJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas,
      method:'GET'
    });
  },
  // 秩和检验   （二分类下有问题）
  zhiHeJianYan(parmas) {
    return request({
      url: `/api/zhiHeJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas,
      method:'GET'
    });
  },
  // T检验
  TJianYan(parmas) {
    return request({
      url: `/api/TJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas,
      method:'GET'
    });
  },
  // 方差分析
  fangChaFenXi(parmas) {
    return request({
      url: `/api/fangChaFenXi?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas,
      method:'GET'
    });
  },
  // 返回推荐的算法
  getCompareWay(parmas) {
    return request({
      url: `/api/getCompareWay?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas,
      method:'GET'
    });
  },

  /*************************************相关分析*********************************/
  // // 正态性检验
  // luoJiHuiGui(parmas) {
  //   return get({
  //     url: `/api/luoJiHuiGui?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
  //     parmas: parmas
  //   });
  // },
  //  // 正态性检验
  //  xianXingHuiGui(parmas) {
  //   return get({
  //     url: `/api/luoJiHuiGui?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
  //     parmas: parmas
  //   });
  // },
  // 相关分析
  XiangGuanXingFenxi(parmas) {
    return request({
      url: `/api/XiangGuanXingFenxi?projectId=${porjectId}&variableCode1=${parmas.variableCode1}&variableCode2=${parmas.variableCode2}`,
      parmas: parmas,
      method:'GET'
    });
  },

  /*************************************回归分析*********************************/
  // 相关分析
  huiGuiFenxi(parmas) {
    return request({
      url: `/api/huiGuiFenxi?projectId=${porjectId}&variableCode1=${parmas.variableCode1}&variableCode2=${parmas.variableCode2}`,
      parmas: parmas,
      method:'GET'
    });
  },

  /*************************************生存分析*********************************/
  // 相关分析
  shenCunFenXi(parmas) {
    return request({
      url: `/api/shenCunFenXi?projectId=${porjectId}&shengCunShiJianCode=${parmas.shengCunShiJianCode}&fenxiCode=${parmas.fenxiCode}&jiejuCode=${parmas.jiejuCode}&codeType_x=${parmas.codeType_x}`,
      parmas: parmas,
      method:'GET'
    });
  }
};

export default statisticalAnalysis;
