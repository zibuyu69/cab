import React from "react";
import { connect } from "dva";
import { Table } from "antd";
import { Form, Modal, Button, Input, Steps } from "antd";
//组件名声明
const FormItem = Form.Item;
//开始
class Admin_mail extends React.Component {
//修改框中的数据即使更改
  changeValue = (value, type) => {
    console.log(value.target.value);
    if (type === "username") {
      this.props.dispatch({
        type: "admin_mail/changeValue",
        payload: {
          username: value.target.value
        }
      });
    }
    if (type === "phoneNumber") {
      this.props.dispatch({
        type: "admin_mail/changeValue",
        payload: {
          phoneNumber: value.target.value
        }
      });
    }
    if (type === "number") {
      this.props.dispatch({
        type: "admin_mail/changeValue",
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
      type: "admin_mail/changeValue",
      payload: value
    });
    this.setState({
      visible: true
    });
  };
  //样式
  render() {
    const columns = [
      {
        title: "快递单号",
        dataIndex: "number"
      },
      {
        title: "用户姓名",
        dataIndex: "username"
      },
      {
        title: "手机号码",
        dataIndex: "phoneNumber"
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
    //从props中取值来应用
    const data = this.props.admin_mail.userlist;
    console.log(data);

    //指定选中项的 key 数组，需要和 onChange 进行配合
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

    console.log(this.props.admin_mail);

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
              value={this.props.admin_mail.username} // model层的state必须先定义
              onChange={value => this.changeValue(value, "username")}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="手机号码:">
            <Input
              placeholder="手机号码"
              value={this.props.admin_mail.phoneNumber}
              onChange={value => this.changeValue(value, "phoneNumber")}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="快递单号:">
            <Input
              placeholder="快递单号"
               value={this.props.admin_mail.number}
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
  const admin_mail = state.admin_mail;
  return { admin_mail, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Admin_mail);
