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
  GetVariables(parmas) {
    return get({
      url: `/api/GetVariables?projectId=${porjectId}`,
      parmas: parmas
    });
  },
  yiBanXingMiaoShu(parmas) {
    return get({
      url: `/api/yiBanXingMiaoShu?projectId=${porjectId}&variableName=${parmas.variableCode}`,
      parmas: parmas
    });
  }
  // yiBanXingMiaoShu1(params){
  //   return request({
  //     url: "/api/yiBanXingMiaoShu",
  //     method: "post",
  //     params: params
  //   })
  // }
};

export default statisticalAnalysis;
