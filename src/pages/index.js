import React from "react";
import { Layout, Menu, Row, Col, Card , Button} from "antd";
import { connect } from "dva";

class Index extends React.Component {
  render() {
    const windowHight = document.documentElement.clientHeight;
    return (
      <div style={{ padding: "60px 12%",height:windowHight-60 }} className="bac_img">
        <Row>
          <Col  md={9} >
          <center><Button type="primary" className="button">存件</Button></center>
          </Col>
          <Col  md={6} >

          </Col>
          <Col  md={9} >
            <center><Button type="primary" className="button">取件</Button></center>
          </Col>
        </Row>
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
