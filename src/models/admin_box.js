import { message } from "antd";
import { getList, update, pickup } from "../services/admin_box";

export default {
  //命名空间
  namespace: "admin_box",
  state: {
    list: [],
    userlist: [],
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
      // const backData = yield call(pickup, payload);
      const backData = {
        data: {
          status: 200,
          data: [
            {
              username: "李",
              phoneNumber:"11123",
              number:"44555"
            }
          ]
        }
      };
      if (backData && backData.data.status === 200) {
        message.success("成功");
        yield put({
          type: "save",
          jb: {
            userlist: backData.data.data
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
