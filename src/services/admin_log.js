import request from "../utils/request";

export function getList(params) {
  return request("/cab/getLogs", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
