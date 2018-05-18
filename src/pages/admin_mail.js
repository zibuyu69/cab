import React from "react";
import { connect } from "dva";
import { Table } from "antd";

class Admin_mail extends React.Component {
  render() {
    const columns = [
      {
        title: "用户姓名",
        dataIndex: "username",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "手机号码",
        dataIndex: "phoneNumber"
      },
      {
        title: "快递单号",
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
    //从props中取值来应用
  const data = this.props.admin_mail.userlist;
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
}
//从redux中取值放到props中
function mapStateToProps(state) {
  const admin_mail = state.admin_mail;
  return { admin_mail, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Admin_mail);
