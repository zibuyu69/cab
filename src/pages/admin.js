import React from "react";
import { connect } from "dva";
import { Menu, Icon,Button } from "antd";
import Admin_mail from "./admin_mail";
import Admin_box from "./admin_box";
import Admin_log from "./admin_log";
import Admin_user from "./admin_user";
import router from "umi/router";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let fuck = null;
fuck = <Admin_mail />;
class admin extends React.Component {
  routerGo = type => {
    console.log(type);
    if (type === "return") {
      router.push("/");
    }
  };
  state = {
    current: "mail"
  };
  handleClick = e => {
    console.log("click ", e);
    if (e.key == "box") {
      fuck = <Admin_box />;
      this.props.dispatch({
        type: "admin_box/getALL",
        payload: {
          pageNum:10,
          pageSize:5
        }
      });
    } else if (e.key == "mail") {
      fuck = <Admin_mail />;
      this.props.dispatch({
        type: "admin_mail/getList",
        payload: {
          type: 1,
          pageNum: 1,
          pageSize: 5
        }
      });
    } else if (e.key == "log") {
      fuck = <Admin_log />;
      this.props.dispatch({
        type: "admin_log/getList",
        payload: {
          pageNum: 1,
          pageSize: 5
        }
      });
    } else if (e.key == "user") {
      fuck = <Admin_user />;
      this.props.dispatch({
        type: "admin_user/getALL",
        payload: {
          pageNum:1,
          pageSize:5
        }
      });
    } else {
      router.push("/");
    }
    this.setState({
      current: e.key
    });
  };

  render() {
    const windowHight = document.documentElement.clientHeight;

    return (
      <div
        style={{ padding: "60px 12%", height: windowHight - 60 }}
        className="bac3_img"
      >

        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail">
            <Icon type="mail" />快递管理
          </Menu.Item>
          <Menu.Item key="user">
            <Icon type="user" />用户管理
          </Menu.Item>
          <Menu.Item key="box">
            <Icon type="database" />快递柜管理
          </Menu.Item>
          <Menu.Item key="log">
            <Icon type="calendar" />日志

          </Menu.Item>
          <Button
            type="primary"
            className="button_margin"
            onClick={() => this.routerGo("return")}
            style={{float:"right",marginTop:"5px",marginRight:"5px"}}
          >
            退出
          </Button>

        </Menu>
        {fuck}
      </div>


    );
  }
}
function mapStateToProps(state) {
  const admin = state.admin;
  return { admin, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(admin);
