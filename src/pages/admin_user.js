import React from "react";
import { connect } from "dva";
import { Table } from "antd";
import { Form, Modal, Button, Input, Steps } from "antd";

const FormItem = Form.Item;

class Admin_user extends React.Component {
  //修改框中的数据即使更改
    changeValue = (value, type) => {
      console.log(value.target.value);
      if (type === "username") {
        this.props.dispatch({
          type: "admin_user/changeValue",
          payload: {
            username: value.target.value
          }
        });
      }
      if (type === "phoneNumber") {
        this.props.dispatch({
          type: "admin_user/changeValue",
          payload: {
            phoneNumber: value.target.value
          }
        });
      }
      if (type === "number") {
        this.props.dispatch({
          type: "admin_user/changeValue",
          payload: {
            number: value.target.value
          }
        });
      }
    };
  //默认修改框不可见
  state = { visible: false };
  //关闭修改框
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  //点击修改，将该行的数据传到dva中，出现修改框
  change = value => {
    console.log(value);
    this.props.dispatch({
      type: "admin_user/changeValue",
      payload: value
    });
    this.setState({
      visible: true
    });
  };
  render() {
    const columns = [
      {
        title: "用户姓名",
        dataIndex: "username"
      },
      {
        title: "手机号码",
        dataIndex: "phoneNumber"
      },
      {
        title: "用户身份",
        dataIndex: "number"
      },
      {
        title: "修改",
        key: "action",
        render: record => {
          console.log(record);
          return <a onClick={() => this.change(record)}>修改</a>;
        }
      }
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    //从props中取值来应用
    const data = this.props.admin_user.userlist;
    console.log(data);

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    return (
      <div>
        <Modal
          title="修改列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <FormItem {...formItemLayout} label="姓名:">
            <Input
              placeholder="姓名"
              value={this.props.admin_user.username} // model层的state必须先定义
              onChange={value => this.changeValue(value, "username")}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="手机号码:">
            <Input
              placeholder="手机号码"
                value={this.props.admin_user.phoneNumber}
              onChange={value => this.changeValue(value, "phoneNumber")}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="用户身份:">
            <Input
              placeholder="快递单号"
              //     value={this.props.admin_user.number}
              onChange={value => this.changeValue(value, "number")}
            />
          </FormItem>
        </Modal>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}
//从redux中取值放到props中
function mapStateToProps(state) {
  const admin_user = state.admin_user;
  return { admin_user, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Admin_user);
