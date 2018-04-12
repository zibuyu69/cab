import { getBlogs, addBlog, getUserById } from "../services/index"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
import { pickup } from "../services/pickup"; // 引入了services

export default {
  namespace: "pickup",

  state: {
    selectedRowList1: [] // 当前选中的列表值LIST
  },
  // 访问 redux
  reducers: {
    save(state, action) {
      return { ...state, ...action.jb };
    }
  },
  // 数据逻辑方法
  effects: {
    // 合并数据方法
    *fetch({ payload }, { call, put }) {
      yield put({ type: "save", payload });
    },
    *getList({ payload }, { call, put }) {
      //开始call
      // const backData = yield call(getBlogs, payload);
      // if (backData.data && backData.data.status === "200") {
      //   const BlogList=backData.data.status;
      //   yield put ({
      //     type:"save",
      //     payload:{
      //       BlogList
      //     }
      //   })
      const data = [
        {
          key: "1",
          name: "李建峰",
          age: 32,
          address: "001"
        },
        {
          key: "2",
          name: "张占东",
          age: 42,
          address: "002"
        },
        {
          key: "3",
          name: "闫若鹏",
          age: 32,
          address: "003"
        }
      ];
      yield put({
        type: "save",
        jb: {
          list: data
        }
      });

      // } else {
      //   message.error("START  ERROR");
      // }
    },
    *open({ payload }, { call, put }) {
      console.log(payload);
      yield put({ type: "save", payload });
      //开始call
      const backData = yield call(pickup, payload);
      if (backData && backData.status === "200") {
        message.success("成功打开柜门");
      } else {
        message.error("ERROR");
      }
    },
    *saveRowList({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: "save",
        jb: {
          selectedRowList1: payload.selectedRows
        }
      });
    }
  },
  //页面加载或者跳转路由执行的方法
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/pickup") {
          // 获取 帖子列表
          dispatch({
            type: "getList",
            payload: {

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
