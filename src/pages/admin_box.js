import React from "react";
import { connect } from "dva";
import { Table } from "antd";

const windowHight = document.documentElement.clientHeight*(4/7);


class Admin_box extends React.Component {
  startUse=value=>{
    console.log(value);
      value.box_type=0,
    this.props.dispatch({
      type: "admin_box/startUse",
      payload: value
    });
  }
  stopUse=value=>{
    console.log(value);
      value.box_type=1,
    this.props.dispatch({
      type: "admin_box/startUse",
      payload: value
    });
  }
  render() {
    const columns = [
      {
        title: "快递柜号",
        dataIndex: "box_no",
        width: 300
      },
      {
        title: "快递柜状态",
        dataIndex: "",
        width: 300,
        render: (record, userlist) => {
          console.log(record);
          if (userlist.box_type == 0) {
            return <div>可使用</div>;
          }else if (userlist.box_type == 1) {
            return <div>已禁用</div>;
          }
        }
      },
      {
        title: "操作",
        key: "action",
        render: record => {
          console.log(record);
          return (
            <span>
              <a onClick={() => this.startUse(record)}>启用</a>&nbsp;
              <a onClick={() => this.stopUse(record)}>禁用</a>
            </span>
          );
        }
      }
    ];
    //从props中取值来应用
    const data = this.props.admin_box.userlist;
    console.log(this.props.admin_box);
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: windowHight }} pagination={false}/>
    );
  }
}
//从redux中取值放到props中
function mapStateToProps(state) {
  const admin_box = state.admin_box;
  return { admin_box, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Admin_box);6
