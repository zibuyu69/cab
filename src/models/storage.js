import { getBlogs, addBlog, getUserById } from "../services/index"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
export default {
  namespace: "storage",
  state: {
    phoneNumber: "",
    number: "",
    boxNumber: ""
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
    *saveNumbers({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: "save",
        payload
      });
    }
  },
  //页面加载或者跳转路由执行的方法
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/") {
          // 获取 帖子列表
          dispatch({
            type: "getBlogList",
            payload: {
              pageNum: 1,
              pageSize: 10,
              key: "123"
            }
          });
          // 获取当前 session 的用户基本信息
          dispatch({
            type: "getUserInfo",
            payload: {}
          });
        }
      });
    }
  }
};
