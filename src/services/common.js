import request from "../utils/request";

// 登陆
export function login(params) {
  return request("/atom/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// session 获取当前登陆用户信息
export function getUserBySession(params) {
  return request("/atom/getUserBySession", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
