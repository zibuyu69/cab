import request from "../utils/request";

export function getBlogs(params) {
  return request("/atom/getBlogs", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// 登陆接口
export function login(params) {
  return request("/atom/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function addBlog(params) {
  return request("/atom/insertBlog", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function getUserById(params) {
  return request("/atom/getUserById", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
