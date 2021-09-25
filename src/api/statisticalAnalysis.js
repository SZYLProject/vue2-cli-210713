import request from "@/utils/axios";
import { get, post } from "@/utils/axios";
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
  }
};

export default statisticalAnalysis;
