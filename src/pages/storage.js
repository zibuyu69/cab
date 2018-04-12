import React from "react";
import { Layout, Menu, Row, Col, Card, Button, Input } from "antd";
import { connect } from "dva";
import router from "umi/router";


class Index extends React.Component {
  routerGo = (type) => {
    if(type==='find'){
        router.push("/find");
    }
    if(type==='return'){
        router.push("/");
    }
  }
  open = () => {
    console.log(this.props.storage);
    this.props.dispatch({
      type: "storage/open",
      payload: {
        data: this.props.storage
      }
    });
  };

  onChange = (value, type) => {
    console.log(value.target.value);
    if (type === "phoneNumber") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
          phoneNumber: value.target.value
        }
      });
    }
    if (type ==="number") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
          number: value.target.value
        }
      });
    }
    if (type === "boxNumber") {
      this.props.dispatch({
        type: "storage/saveNumbers",
        payload: {
          boxNumber: value.target.value
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
        <div className="message_box">
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
