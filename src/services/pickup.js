import request from "../utils/request";

export function pickup(params) {
  return request("/cab/pickup", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function getList(params) {
  return request("/cab/getList", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function update(params) {
  return request("/cab/update", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
