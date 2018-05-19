import request from "../utils/request";

export function admin_user(params) {
  return request("/cab/admin_user", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
