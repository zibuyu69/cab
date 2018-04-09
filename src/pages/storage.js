import React from "react";
import { Layout, Menu, Row, Col, Card , Button,Input } from "antd";
import { connect } from "dva";

class Index extends React.Component {
  render() {
    const windowHight = document.documentElement.clientHeight;
    return (
      <div style={{ padding: "60px 12%",height:windowHight-60 }} className="bac_img">
        <Input placeholder="Basic usage" />
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const index = state.index;
  return { index, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Index);
