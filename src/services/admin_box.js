import request from "../utils/request";

export function admin_box(params) {
  return request("/cab/admin_box", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
