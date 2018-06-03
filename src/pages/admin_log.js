import React from "react";
import { connect } from "dva";
import { Table } from "antd";

class Admin_log extends React.Component {
  onTableChange = pagination => {
    console.log(pagination);
    this.props.dispatch({
      type: "admin_log/getList",
      payload: {
  
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      }
    });
  };
  render() {
    const columns = [
      {
        title: "用户姓名",
        dataIndex: "user_name",
      },
      {
        title: "手机号码",
        dataIndex: "phone_number"
      },
      {
        title: "快递单号",
        dataIndex: "pa_no"
      },
      {
        title: "记录时间",
        dataIndex: "log_date"
      },
      {
        title: "进行操作",
        dataIndex: "",
        render: (record, userlist) => {
          console.log(record);
          if (userlist.log_type == 0) {
            return <div>存入</div>;
          }else if (userlist.log_type == 1) {
            return <div>取出</div>;
          }
        }
      },

    ];
    //从props中取值来应用
  const data = this.props.admin_log.userlist;
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
      <Table
        onChange={this.onTableChange}
        rowSelection={rowSelection}
        pagination={this.props.admin_log.listPagination}
        columns={columns} dataSource={data} />
    );
  }
}
//从redux中取值放到props中
function mapStateToProps(state) {
  const admin_log = state.admin_log;
  return { admin_log, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Admin_log);
