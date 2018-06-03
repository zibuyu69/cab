import request from "../utils/request";

export function admin_log(params) {
  return request("/cab/admin_log", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
