import { getBlogs, addBlog, getUserById } from "../services/index"; // 引入了services
import { getUserBySession } from "../services/common";
import { message } from "antd";
export default {
  namespace: "index",

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
    // 根据下滚条，进行读取数据
    *nextPage({ payload }, { call, put, select }) {
      const { page, blogList } = yield select(store => store.index);
      const payData = {
        pageNum: page.pageNum + 1,
        pageSize: page.pageSize
      };
      const backData = yield call(getBlogs, payData); // 访问后台方法
      console.log("backData", backData);
      if (backData.data && backData.data.status === 200) {
        const newBlogList = backData.data.data;
        if (newBlogList !== null) {
          yield put({
            type: "save",
            payload: {
              listenerFlag: true,
              blogList: blogList.concat(newBlogList),
              page: {
                pageNum: page.pageNum + 1,
                pageSize: page.pageSize
              }
            }
          });
        } else {
          yield put({
            type: "save",
            payload: {
              pageEndFlag: true
            }
          });
        }
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取登陆者的基本信息，来判断是否登录
    *getUserInfo({ payload }, { call, put }) {
      const backData = yield call(getUserBySession, payload); // 访问后台方法
      console.log("backData", backData);
      if (backData.data && backData.data.status === 200) {
        const userInfoList = backData.data.data;
        yield put({
          type: "save",
          payload: {
            userInfoList
          }
        });
      } else {
        // 用户未登陆
      }
    },
    // 获取Blog 列表
    *getBlogList({ payload }, { call, put }) {
      const backData = yield call(getBlogs, payload); // 访问后台方法
      console.log("backData", backData);
      if (backData.data && backData.data.status === 200) {
        const blogList = backData.data.data;
        yield put({
          type: "save",
          payload: {
            blogList
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    *addBlog({ payload }, { call, put }) {
      console.log(payload);
      const backData = yield call(addBlog, payload); // 访问后台方法
      if (backData.data.status === 200) {
        message.success("添加成功！");
        yield put({
          type: "getBlogList",
          payload: {
            pageNum: 1,
            pageSize: 10,
            key: "123"
          }
        });
      }
    },
    *findBlog({ payload }, { call, put }) {
      console.log(payload);
      const backData = yield call(getUserById, payload); // 访问后台方法
      if (backData.data.status === 200) {
        message.success(backData.data.data.userId);
      }
    }
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
