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
    // 打开柜门存入快递
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
    //输入框获取改变的
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
