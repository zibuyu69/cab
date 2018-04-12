import request from "../utils/request";

export function find(params) {
  return request("/cab/find", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
