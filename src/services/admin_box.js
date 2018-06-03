import request from "../utils/request";



export function admin_box(params) {
  return request("/cab/admin_box", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function getALL(params) {
  return request("/cab/getBoxes", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function updateBox(params) {
  return request("/cab/updateBox", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
