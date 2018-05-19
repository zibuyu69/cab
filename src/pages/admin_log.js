import React from "react";
import { connect } from "dva";
import { Table } from "antd";

class Admin_box extends React.Component {
  render() {
    const columns = [
      {
        title: "用户姓名3",
        dataIndex: "username",
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
        title: "存入时间",
        dataIndex: "number"
      },
      {
        title: "取出时间",
        dataIndex: "number"
      },
      {
        title: "存入快递员",
        dataIndex: "number"
      },

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
export default connect(mapStateToProps)(Admin_box);
