import request from "../utils/request";

export function login(params) {
  return request("/cab/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
