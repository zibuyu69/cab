import fetch from "dva/fetch";
import { message } from "antd";
import router from "umi/router";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
// 对数据的校验，如果是登陆过期，则强制转向登录页面！
function checkData(data){
  if(data.data.status === 0) {
    message.warning("登陆过期！请重新登陆！");
    router.push("/login");
  }
  return data;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options.headers = {
    "Content-Type": "application/json"
  };
  // 跨域传session :
  options.credentials = "include";
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return checkData({data});
    })
    .catch(err => ({ err }));
}
