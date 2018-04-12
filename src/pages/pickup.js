import React from "react";
import { Layout, Menu, Row, Col, Card, Button, Input, Table } from "antd";
import { connect } from "dva";
import router from "umi/router";


class Index extends React.Component {
  routerGo = (type) => {
    if(type==='return'){
        router.push("/");
  }
  }
  open = () => {
    console.log(this.props.pickup);
    this.props.dispatch({
      type: "pickup/open",
      payload: {
        data: this.props.pickup
      }
    });
  };
  render() {
  const data=  this.props.pickup.list
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
    console.log(this.props.pickup.list);

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
          <Button type="primary" className="button_margin" onClick={()=>this.routerGo('return')}>
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
