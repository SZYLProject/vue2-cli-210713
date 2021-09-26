import Cookies from "js-cookie";
const projectId = "projectId";
// const TokenKey = 'Admin-Token'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey);
}

export function setToken(TokenKey, token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey);
}

export function setProjectIdSession(id) {
  return sessionStorage.setItem(projectId, id);
}
export function getProjectIdSession() {
  return sessionStorage.getItem(projectId);
}
export function removeProjectIdSession() {
  return sessionStorage.removeItem(projectId);
}
