import request from '@/request/mockAxios'


export function getSalesTableList(params) {
  return request({
    url: '/sales/get',
    method: 'get',
    params: params
  })
}