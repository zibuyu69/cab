import { message } from "antd";
import { getList, update, pickup, getALL,updateUser } from "../services/admin_user";

export default {
  //命名空间
  namespace: "admin_user",
  state: {
    list: [],
    userlist: [],
    userName: "",
    phoneNumber: "",
    userId:"",

    // 表格配置项
    listPagination: {
      current: 1,
      total: 0,
      pageSize: 5
    }
  },
  //从dva中往redux中存值
  reducers: {
    save(state, action) {
      return { ...state, ...action.jb };
    }
  },
  effects: {
    *getALL({ payload }, { call, put }) {
      const backData = yield call(getALL, payload);
      if (backData && backData.data.status === 200) {
        yield put({
          type: "save",
          jb: {
            userlist: backData.data.data
          }
        });
      } else {
        message.error("ERROR");
      }
    },

    *changeValue({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: "save",
        jb: payload
      });
    },

    *updata({ payload }, { call, put }) {
      console.log(payload);
      const backData = yield call(updateUser, payload);
      if (backData && backData.data.status === 200) {
        yield put({
          type: "getALL",
          payload: {
            pageNum:1,
            pageSize:5
          }
        });
      } else {
        message.error("ERROR");
      };
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/admin") {
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
