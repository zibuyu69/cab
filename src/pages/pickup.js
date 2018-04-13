import React from "react";
import { Layout, Menu, Row, Col, Card, Button, Steps, Table } from "antd";
import { connect } from "dva";
import router from "umi/router";
const Step = Steps.Step;


class Index extends React.Component {
  onTableChange = (pagination) => {
    console.log(pagination);
    this.props.dispatch({
      type: "pickup/getList",
      payload: {
        type:0,
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      }
    });
  }
  //跳转页面
  routerGo = (type) => {
    if(type==='return'){
        router.push("/");
  }
  }
  //打开柜门
  open = () => {
    console.log(this.props.pickup);
    const ArrayList = this.props.pickup.selectedRowList1.map(item => {
      return item.pa_no;
    });
    console.log(this.props.pickup);
    this.props.dispatch({
      type: "pickup/open",
      payload:  {
      boxNumberList:  ArrayList
      }
    });
  };

  render() {
    const data=  this.props.pickup.list
    const windowHight = document.documentElement.clientHeight;//获得窗口高度
    const columns = [
      {
        title: "姓名",
        dataIndex: "username"
      },
      {
        title: "柜门号",
        dataIndex: "box_no"
      },
      {
        title: "快递单号",
        dataIndex: "pa_no"
      }
    ];
    console.log(this.props.pickup.list);

    const rowSelection = {
      selectedRowKeys: this.props.pickup.selectedRowKeys,
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
        this.props.dispatch({
          type: "pickup/save",
          jb: {
            selectedRowKeys,
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
        style={{ padding: "60px 5%", height: windowHight - 60 }}
        className="bac1_img"
      >
        <Steps direction="vertical" current={2} style={{display:"inline-block", width:"20%",float:"left", marginTop:"60px",marginRight:"50px"}}>
        <Step title="登录" description="请输入您的登录账号和密码" />
        <Step title="填写信息" description="请填写需要存入快递的信息" />
        <Step title="管理" description="进行快递信息的管理" />
      </Steps>
        <Table
          style={{display:"inline-block", width:"70%",}}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
           pagination={this.props.pickup.listPagination}
           onChange={this.onTableChange}
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
