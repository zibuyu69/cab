import { storage} from "../services/storage"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
import router from "umi/router";

export default {
  namespace: "storage",
  state: {
      phone_number: "",
    pa_no: "",
    box_no: ""
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
      console.log(backData);
      if (backData && backData.data.status === 200 && backData.data.data===true)  {
        message.success("成功打开柜门并存入快递");
      } else {
        message.error("该快递柜已被占用");
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
