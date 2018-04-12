import React from "react";
import { Divider, Modal, Row, Col, Card, Button, Input, Table } from "antd";
import { connect } from "dva";
import router from "umi/router";

class Index extends React.Component {
  state = { visible: false };

  handleOk = e => {
    this.props.dispatch({
      type: "find/changeTrue",
      payload: {
        data: this.props.storage
      }
    });
    console.log(e);
    this.setState({
      visible: false
    });
  };
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
  find = value => {
    console.log(value);
    this.props.dispatch({
      type: "find/find",
      payload: {
        data: value
      }
    });
  };
  change = value => {
    console.log(value);
    this.props.dispatch({
      type: "find/change",
      payload: {
        data: value
      }
    });
    this.setState({
      visible: true
    });
  };
  open = () => {
    console.log(this.props.find);
    this.props.dispatch({
      type: "find/open",
      payload: {
        data: this.props.find
      }
    });
  };
  changeValue = (value, type) => {
    console.log(value.target.value);
    if (type === "name") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          name: value.target.value
        }
      });
    }
    if (type === "boxNumber") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          boxNumber: value.target.value
        }
      });
    }
    if (type === "numbers") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          numbers: value.target.value
        }
      });
    }
    if (type === "lasttime") {
      this.props.dispatch({
        type: "find/changeValue",
        payload: {
          lasttime: value.target.value
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
        dataIndex: "name"
      },
      {
        title: "柜门号",
        dataIndex: "boxNumber"
      },
      {
        title: "快递单号",
        dataIndex: "numbers"
      },
      {
        title: "最后期限",
        dataIndex: "lasttime"
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
        <Modal
          title="修改列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            placeholder="姓名"
            value={this.props.find.name}
            onChange={value => this.changeValue(value, "name")}
          />
          <Input
            placeholder="柜门号"
            value={this.props.find.boxNumber}
            onChange={value => this.changeValue(value, "boxNumber")}
          />
          <Input
            placeholder="快递单号"
            value={this.props.find.numbers}
            onChange={value => this.changeValue(value, "numbers")}
          />
          <Input
            placeholder="最后期限"
            value={this.props.find.lasttime}
            onChange={value => this.changeValue(value, "lasttime")}
          />
        </Modal>
        <div className="find_1">
          <p>查询快递</p>
          <Search
            placeholder="请输入要查询的快递单号"
            onSearch={value => this.find(value)}
            enterButton
          />
          <br />
        </div>
        <br />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
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
