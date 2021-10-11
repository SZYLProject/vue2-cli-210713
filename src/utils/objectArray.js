// 自定义方法变量，获取对象的keys
export function getObjectKeys(object) {
  var keys = [];
  for (var key in object) keys.push(key);
  return keys;
}
// 自定义方法变量，获取对象的value
export function getObjectValues(object) {
  var values = [];
  for (var key in object) values.push(object[key]);
  return values;
}
// 自定义方法变量，获取对象的value(返回对象中数组字符串)
export function getObjectParseValues(object) {
  var values = [];
  for (var key in object) values.push(JSON.parse(object[key]));
  return values;
}

export function unid(arr) {
  let result_str1 = arr.join(',').split(',');

  let result_number = result_str1.map(item => {
    return Number(item);
  });
  return result_number;
}