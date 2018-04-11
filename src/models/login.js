import { getBlogs, addBlog, getUserById } from "../services/index"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
export default {
  namespace: "login",

  state: {
    userInfoList: {}, // 用户个人信息集合
    blogList: [], // 获取到的帖子集合
    listenerFlag: true, // 划到最下面的加载标记
    pageEndFlag: false, // 页面拉到底的判定
    page: {
      pageNum: 1,
      pageSize: 10
    }
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
    *login({ payload }, { call, put }) {
      console.log(payload);
      yield put({ type: "save", payload });
    },
    // 根据下滚条，进行读取数据

    // 获取登陆者的基本信息，来判断是否登录

    // 获取Blog 列表
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
