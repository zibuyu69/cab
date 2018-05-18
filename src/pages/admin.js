import React from "react";
import { connect } from "dva";
import { Menu, Icon } from "antd";
import Admin_mail from "./admin_mail";
import Admin_box from "./admin_box";
import Admin_log from "./admin_log";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let fuck = null;
   fuck = <Admin_mail />;
class admin extends React.Component {
  state = {
    current: "mail"
  };
  handleClick = e => {
    console.log("click ", e);
    if (e.key == "user") {
      fuck = <Admin_box />;
    }else if(e.key == "mail"){
       fuck = <Admin_mail />;
    }else if(e.key == "log"){
     fuck = <Admin_log />;
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
            <Icon type="mail" />收件人管理
          </Menu.Item>
          <Menu.Item key="user">
            <Icon type="box" />快递员管理
          </Menu.Item>
          <Menu.Item key="log">
            <Icon type="calendar" />日志
          </Menu.Item>
        </Menu>
        {fuck}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const index = state.index;
  return { index, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(admin);
