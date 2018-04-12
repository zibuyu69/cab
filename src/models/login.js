import { login } from "../services/login"; // 引入了services
import { message } from "antd";
import pathToRegexp from "path-to-regexp";
import router from "umi/router";

export default {
  namespace: "login",
  state: {
    type: ""
  },
  // 访问 redux
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
  // 数据逻辑方法
  effects: {
    // 合并数据方法
    *fetch({ payload }, { call, put }) {
      yield put({ type: "save", payload });
    },
    *login({ payload }, { call, put, select }) {
      console.log(payload);

      //从redux中获取type传到payload
      const { type } = yield select(store => store.login);
      payload.type = type;
      //开始call

      const backData = yield call(login, payload);
        console.log( backData.data.status);
        console.log(backData.data.msg);

      if (backData && backData.data.status === 200 && backData.data.msg==="SUCCESS") {

        message.success("login OK");
        router.push("/" + type);
      } else {
        message.error("ERROR");
      }
    }
  },
  //页面加载或者跳转路由执行的方法
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.indexOf("/login") >= 0) {
          const re = pathToRegexp("/login/:type");
          const match = re.exec(location.pathname);
          const type = match[1];
          dispatch({
            type: "save",
            payload: {
              type
            }
          });
        }
      });
    }
  }
};
