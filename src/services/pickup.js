import request from "../utils/request";

export function pickup(params) {
  return request("/cab/pickup", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
