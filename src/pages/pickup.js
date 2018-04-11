import React from "react";
import { Layout, Menu, Row, Col, Card, Button, Input, Table } from "antd";
import { connect } from "dva";

class Index extends React.Component {
  open = () => {
    console.log(this.props.pickup);
  };
  render() {
    console.log(this.props.pickup);
    const windowHight = document.documentElement.clientHeight;


    const columns = [
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "柜门号",
        dataIndex: "age"
      },
      {
        title: "快递单号",
        dataIndex: "address"
      }
    ];
    const data = [
      {
        key: "1",
        name: "李建峰",
        age: 32,
        address: "001"
      },
      {
        key: "2",
        name: "张占东",
        age: 42,
        address: "002"
      },
      {
        key: "3",
        name: "闫若鹏",
        age: 32,
        address: "003"
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.props.dispatch({
          type: "pickup/saveRowList",
          payload: {
            selectedRows
          }
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    return (
      <div
        style={{ padding: "60px 12%", height: windowHight - 60 }}
        className="bac1_img"
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
        <div className="button_margin">
          <Button type="primary" onClick={this.open}>
            打开柜门
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" className="button_margin">
            退出
          </Button>
        </div>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const pickup = state.pickup;
  return { pickup, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Index);
