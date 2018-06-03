import request from "../utils/request";

export function admin_mail(params) {
  return request("/cab/admin_mail", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
