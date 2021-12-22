import request from "@/utils/axios";
import { get, post } from "@/utils/axios";
import { getProjectIdSession } from "@/utils/auth";
const porjectId = getProjectIdSession();
export function FenLeiBianLiangMiaoShuTongJi(params) {
  return request({
    url: "/FenLeiBianLiangMiaoShuTongJi",
    method: "get",
    params: params
  });
}
export function fenZuTongJi(data) {
  return request({
    url: "/fenZuTongJi?name=trt",
    method: "post",
    params: data
  });
}
const statisticalAnalysis = {
  FenLeiBianLiangMiaoShuTongJi(params) {
    return get({ url: "/FenLeiBianLiangMiaoShuTongJi", params: params });
  },
  fenZuTongJi(data) {
    return post({ url: `/fenZuTongJi?name=${data.name}`, data: data.data });
  },

  /*************************************一般描述接口*********************************/

  GetVariables(parmas) {
    return get({
      url: `/api/GetVariables?projectId=${porjectId}`,
      parmas: parmas
    });
  },
  yiBanXingMiaoShu(parmas) {
    return get({
      url: `/api/yiBanXingMiaoShu?projectId=${porjectId}&variableCode=${parmas.variableCode}`,
      parmas: parmas
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
    return get({
      url: `/api/zhengTaiJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas
    });
  },
  // 方差齐性检验
  fangChaQiXingJianYan(parmas) {
    return get({
      url: `/api/fangChaQiXingJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas
    });
  },
  // 秩和检验   （二分类下有问题）
  zhiHeJianYan(parmas) {
    return get({
      url: `/api/zhiHeJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas
    });
  },
  // T检验
  TJianYan(parmas) {
    return get({
      url: `/api/TJianYan?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas
    });
  },
  // 方差分析
  fangChaFenXi(parmas) {
    return get({
      url: `/api/fangChaFenXi?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas
    });
  },
  // 返回推荐的算法
  getCompareWay(parmas) {
    return get({
      url: `/api/getCompareWay?projectId=${porjectId}&fenZuCode=${parmas.fenZuCode}&lianXuCode=${parmas.lianXuCode}`,
      parmas: parmas
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
    return get({
      url: `/api/XiangGuanXingFenxi?projectId=${porjectId}&variableCode1=${parmas.variableCode1}&variableCode2=${parmas.variableCode2}`,
      parmas: parmas
    });
  },
};

export default statisticalAnalysis;
