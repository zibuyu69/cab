import React from "react";
import { Form, Modal, Button, Input, Table,Steps } from "antd";
import { connect } from "dva";
import router from "umi/router";

const FormItem = Form.Item;
const Step = Steps.Step;

class Index extends React.Component {
  //
  state = { visible: false };
  onTableChange = pagination => {
    console.log(pagination);
    this.props.dispatch({
      type: "find/getList",
      payload: {
        type: 1,
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      }
    });
  };
  //触发修改
  handleOk = e => {
    console.log(this.props.find.phone_number);
    this.props.dispatch({
      type: "find/changeTrue",
      payload: {
        pa_id: this.props.find.pa_id,
        username: this.props.find.username,
        pa_no: this.props.find.pa_no,
        box_no: this.props.find.box_no,
        last_time: this.props.find.last_time,
        phone_number: this.props.find.phone_number
      }
    });
    console.log(e);
    this.setState({
      visible: false
    });
  };
  //关闭修改
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  routerGo = type => {
    if (type === "return") {
      router.push("/");
    }
  };
  search = (value, type) => {
    console.log(value);
    console.log(type);
    this.props.dispatch({
      type: "find/getList",
      payload: {
        type: 1,
        searchValue: value,
        pageNum: 1,
        pageSize: 5
      }
    });
  };
  change = value => {
    console.log(value);
    this.props.dispatch({
      type: "find/changeValue",
      payload: value
    });
    this.setState({
      visible: true
    });
  };

  open = () => {
    console.log(this.props.find.selectedRowList1.length);
    const ArrayList = this.props.find.selectedRowList1.map(item => {
      return item.pa_no;
    });
    this.props.dispatch({
      type: "find/open",
      payload: {
        boxNumberList: ArrayList
      }
    });
  };
  changeValue = (value, type) => {
    console.log(value.target.value);
    if (type === "username") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          username: value.target.value
        }
      });
    }
    if (type === "box_no") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          box_no: value.target.value
        }
      });
    }
    if (type === "pa_no") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          pa_no: value.target.value
        }
      });
    }
    if (type === "last_time") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          last_time: value.target.value
        }
      });
    }
  };
  render() {
    console.log(this.props);
    const windowHight = document.documentElement.clientHeight;
    const Search = Input.Search;
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
      },
      {
        title: "最后期限",
        dataIndex: "last_time"
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
    console.log(this.props.find);
    const data = this.props.find.list;
    const rowSelection = {
      selectedRowKeys: this.props.find.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.props.dispatch({
          type: "find/saveRowList",
          payload: {
            selectedRows
          }
        });
        this.props.dispatch({
          type: "find/save",
          jb: {
            selectedRowKeys
          }
        });
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
    return (

      <div
        style={{ padding: "30px 3%", height: windowHight - 60 }}
        className="bac1_img"
      >
        <Steps direction="vertical" current={2} style={{display:"inline-block", width:"20%",float:"left", marginTop:"60px",marginRight:"50px"}}>
        <Step title="登录" description="请输入您的登录账号和密码" />
        <Step title="填写信息" description="请填写需要存入快递的信息或者选取需要取出的" />
        <Step title="管理" description="进行快递信息的管理" />
      </Steps>
        <Modal
          title="修改列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <FormItem {...formItemLayout} label="姓名:">
            <Input
              placeholder="姓名"
              value={this.props.find.username} // model层的state必须先定义
              onChange={value => this.changeValue(value, "username")}
              disabled="true"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="柜门号:">
            <Input
              placeholder="柜门号"
              value={this.props.find.box_no}
              onChange={value => this.changeValue(value, "box_no")}
              disabled="true"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="快递单号:">
            <Input
              placeholder="快递单号"
              value={this.props.find.pa_no}
              onChange={value => this.changeValue(value, "pa_no")}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="最后期限:">
            <Input
              placeholder="最后期限"
              value={this.props.find.last_time}
              onChange={value => this.changeValue(value, "last_time")}
            />
          </FormItem>
        </Modal>
        <div className="find_1">
          <p>查询快递</p>
          <Search
            placeholder="请输入要查询的快递单号"
            onSearch={value => this.search(value, "query")}
            enterButton
          />
          <br />
        </div>
        <br />
        <Table
           style={{display:"inline-block", width:"70%",}}
          rowSelection={rowSelection}
          columns={columns}
          pagination={this.props.find.listPagination}
          dataSource={data}
          onChange={this.onTableChange}
        />
        <div className="button_margin">
          <Button type="primary" onClick={this.open}>
            打开柜门
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            className="button_margin"
            onClick={() => this.routerGo("return")}
          >
            退出
          </Button>
        </div>
      </div>

    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const find = state.find;
  return { find, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Index);
