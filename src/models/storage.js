import { storage} from "../services/storage"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
import router from "umi/router";

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
    *open({ payload }, { call, put }) {
        console.log(payload);
      //开始call
      const backData = yield call(storage, payload);
      if (backData && backData.status === "200") {
        message.success("成功打开柜门");
      } else {
        message.error("ERROR");
      }
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
        }
      });
    }
  }
};
