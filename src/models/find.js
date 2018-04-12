import { addBlog, getUserById } from "../services/index"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
import router from "umi/router";
import { find } from "../services/find"; // 引入了services
import { getBlogs } from "../services/getBlogs"; // 引入了services
import { getList } from "../services/pickup";
import { update } from "../services/pickup";
import { pickup } from "../services/pickup";
export default {
  namespace: "find",
  state: {
    list: [],
    selectedRowKeys: [],
    selectedRowList1: [] ,// 当前选中的列表值LIST
    username:'',
    box_no:'',
    pa_no:'',
    last_time:'',
    type:'',
    listPagination: {
         // 表格配置项
         current: 1,
         total: 0,
         pageSize: 5,
         pageSizeOptions: ['10', '20', '50', '100'],
       },
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
    *changeValue({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: "save",
        jb:
        payload

    });

    },
    *change({payload},{call,put}){
      yield put ({type:"save",
    jb:
      payload.data

    });
    },
    *changeTrue({ payload }, { call, put }) {
        console.log(payload);
      //开始call
      const backData = yield call(update, payload);
      if (backData && backData.data.status === 200 && backData.data.msg==="SUCCESS" && backData.data.data===true) {
        message.success("成功");
        yield put({
          type: "getList",
          payload: {
            type:1,
            pageNum:1,
            pageSize:5
          }
        });
      }
       else {
        message.error("ERROR");
      }
    },
    *getList({ payload }, { call, put }) {
      console.log(payload);
      const backData=yield call(getList,payload);

      if (backData && backData.data.status === 200 && backData.data.msg==="SUCCESS") {
        console.log(backData.data.data);
        const data=backData.data.data.data
        yield put({
          type: "save",
          jb: {
            list:data,
            listPagination: {
                 // 表格配置项
                 current: backData.data.data.pageInfo.pageno,
                 total: backData.data.data.pageInfo.total,
                 pageSize: backData.data.data.pageInfo.rowcount,
                 pageSizeOptions: ['10', '20', '50', '100'],
               },
          }
        });
      } else {
        message.error("ERROR");
      }


      // } else {
      //   message.error("START  ERROR");
      // }
    },
    *open({ payload }, { call, put }) {
      console.log(payload);

      //开始call
      const backData = yield call(pickup, payload);

      if (backData && backData.data.status === 200 && backData.data.msg==="SUCCESS") {
        message.success("成功");
        yield put({
          type: "getList",
          payload: {
            type:1,
            pageNum:1,
            pageSize:5
          }
        });
        yield put({
          type: "save",
          jb: {
            selectedRowKeys: [],
          }
        });
      } else {
        message.error("ERROR");
      }
    },

    *saveRowList({ payload }, { call, put }) {
      console.log(payload.selectedRows);
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
        if (location.pathname === "/find") {
          // 获取 帖子列表
          dispatch({
            type: "getList",
            payload: {
              type:1,
              pageNum:1,
              pageSize:5
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
