
import request from "../utils/request";

export function getBlogs(params) {
  return request("/cab/getBlogs", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
