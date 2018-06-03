import request from "../utils/request";

export function admin_user(params) {
  return request("/cab/admin_user", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function getALL(params) {
  return request("/cab/getUsers", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function updateUser(params) {
  return request("/cab/updateUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
