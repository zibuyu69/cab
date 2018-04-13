import React from "react";
import {  Button, Input ,Steps} from "antd";
import { connect } from "dva";
import router from "umi/router";
const Step = Steps.Step;
class Index extends React.Component {
  //页面跳转
  routerGo = (type) => {
    if(type==='find'){
        router.push("/find");
    }
    if(type==='return'){
        router.push("/");
    }
  }
  //打开柜门
  open = () => {
    console.log(this.props.storage);
    this.props.dispatch({
      type: "storage/open",
      payload:
         this.props.storage
    });
  };
  //获取输入框改变的值
  onChange = (value, type) => {
    console.log(value.target.value);
    if (type ==="username") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
            username: value.target.value
        }
      });
    }
    if (type === "phoneNumber") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
          phone_number: value.target.value
        }
      });
    }
    if (type ==="number") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
            pa_no: value.target.value
        }
      });
    }
    if (type === "boxNumber") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
          box_no: value.target.value
        }
      });
    }
  };
  render() {
    const windowHight = document.documentElement.clientHeight;
    return (
      <div
        style={{ padding: "60px 12%", height: windowHight - 60 }}
        className="bac1_img"
      >
        <Steps direction="vertical" current={1} style={{display:"inline-block", width:"20%",float:"left", marginTop:"60px",marginRight:"50px"}}>
        <Step title="登录" description="请输入您的登录账号和密码" />
        <Step title="填写信息" description="请填写需要存入快递的信息或者选取需要取出的" />
        <Step title="管理" description="进行快递信息的管理" />
      </Steps>
        <div className="message_box" style={{display:"inline-block", width:"50%",}}>
          <p>收件人姓名</p>{" "}
          <Input
            onChange={value => this.onChange(value, "username")}
            placeholder="请输入收件人姓名"
          />
          <br />
          <br />
          <p>收件人账号</p>{" "}
          <Input
            onChange={value => this.onChange(value, "phoneNumber")}
            placeholder="请输入收件人手机号"
          />
          <br />
          <br />
          <p>快递单号</p>{" "}
          <Input
            onChange={value => this.onChange(value, "number")}
            placeholder="请输入快递单号"
          />
          <br />
          <br />
          <p>柜门号</p>{" "}
          <Input
            onChange={value => this.onChange(value, "boxNumber")}
            placeholder="请输入快递需要的柜门号"
          />
          <br />
          <br />
          <br />
          <br />
          <div className="button_margin">
            <Button
              type="primary"
              className="button_margin"
              onClick={this.open}
            >
              打开柜门
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" className="button_margin" onClick={()=>this.routerGo('find')}>
              管理
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" className="button_margin" onClick={()=>this.routerGo('return')} >
              退出
            </Button>
          </div>
        </div>

      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const storage = state.storage;
  return { storage, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Index);
