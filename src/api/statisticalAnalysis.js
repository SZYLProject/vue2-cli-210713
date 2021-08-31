import request from '@/utils/axios'

export function FenLeiBianLiangMiaoShuTongJi(params) {
  return request({
    url: '/FenLeiBianLiangMiaoShuTongJi',
    method: 'get',
    params: params
  })
}