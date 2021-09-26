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
