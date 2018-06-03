import { message } from "antd";
import { getList, update, pickup } from "../services/admin_log";

export default {
  //命名空间
  namespace: "admin_log",
  state: {
    list: [],
    userlist: [],
    username: "",
    number: "",
    phoneNumber: "",

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
    *getList({ payload }, { call, put }) {
      console.log(payload);
      const backData = yield call(getList, payload);
      console.log(backData);
      if (backData && backData.data.status === 200) {
        const data = backData.data.data.data;
        console.log(data);
        yield put({
          type: "save",
          jb: {
            userlist: data,
            listPagination: {
              // 表格配置项
              current: backData.data.data.pageInfo.pageno,
              total: backData.data.data.pageInfo.total,
              pageSize: backData.data.data.pageInfo.rowcount,
              pageSizeOptions: ["10", "20", "50", "100"]
            }
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
