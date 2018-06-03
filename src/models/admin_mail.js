import { message } from "antd";
import { getList } from "../services/pickup";
import { getALL, updateUser } from "../services/admin_user";



export default {
  //命名空间
  namespace: "admin_mail",
  state: {
    list: [],
    userlist: [],
    username: "",
    number: "",
    phoneNumber:"",


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
    //往redux中放数据
    *changeValue({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: "save",
        jb: payload
      });
    },
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
    *getList({ payload }, { call, put }) {
      console.log(payload);
     const backData = yield call(getList, payload);
      if (backData && backData.data.status === 200) {
        yield put({
          type: "save",
          jb: {
            userlist: backData.data.data.data
          }
        });
      } else {
        message.error("ERROR");
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/admin") {
          // 获取 列表
          dispatch({
            type: "getList",
            payload: {
              type: 1,
              pageNum: 1,
              pageSize: 5
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
