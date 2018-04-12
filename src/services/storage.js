import request from "../utils/request";

export function storage(params) {
  return request("/cab/storage", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
