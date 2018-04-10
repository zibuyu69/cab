import React from "react";
import { Layout, Menu, Row, Col, Card, Button, Input } from "antd";
import { connect } from "dva";

class Index extends React.Component {
  render() {
    const windowHight = document.documentElement.clientHeight;
    const Search = Input.Search;
    return (
      <div
        style={{ padding: "60px 12%", height: windowHight - 60 }}
        className="bac1_img"
      >

        <div className="message_box">
          <p>查询快递</p>
          <Search
      placeholder="请输入要查询的快递单号"
      onSearch={value => console.log(value)}
      enterButton
    />
          <p>收件人账号</p> <Input placeholder="请输入收件人手机号" />
          <p>快递单号</p> <Input placeholder="请输入快递单号" />
          <p>柜门号</p> <Input placeholder="请输入快递需要的柜门号" />
          <br />
          <br />
          <br />
          <div className="button_margin">
            <Button type="primary" className="button_margin">
              打开柜门
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" className="button_margin">
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
  const index = state.index;
  return { index, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Index);
