import React from "react";
import {  Row, Col, Button,Steps } from "antd";
import { connect } from "dva";
import router from "umi/router";

class Index extends React.Component {
  //跳转路由
  routerGo = (type) => {
    if(type==='storage'){
        router.push("/login/storage");
    }
    if(type==='pickup'){
        router.push("/login/pickup");
    }
  }
  //样式
  render() {
    //获得页面高度
    const Step = Steps.Step;
    const windowHight = document.documentElement.clientHeight;
    return (

      <div style={{ padding: "60px 12%",height:windowHight-60 }} className="bac_img">

        <Row>
          <Col  md={9} >
          <center><Button type="primary" className="button" onClick={()=>this.routerGo('storage')}>存件</Button></center>
          </Col>
          <Col  md={6} >
          </Col>
          <Col  md={9} >
            <center><Button type="primary" className="button" onClick={()=>this.routerGo("pickup")} >取件</Button></center>
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
