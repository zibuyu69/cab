import React from "react";
import router from "umi/router";
import { Layout, Menu, Icon, Dropdown, Button, Avatar ,} from "antd";
import { connect } from "dva";
import withRouter from 'umi/withRouter';

const { Header, Content, Footer } = Layout;
class Layouts extends React.Component {
  state = {};
  componentDidMount() {}
  toggle = () => {};
  routerGo = item => {
    router.push(item.item.props.src);
  };
  render() {

    return (
      <Layout className="layout">

        <Content style={{ padding: "0 0 0 0" }}>{this.props.children}</Content>

        <Footer style={{ textAlign: "center" , height:"60px"}}>
        顺丰快递快递柜© 2017  顺丰速运  版权所有    粤  ICP  备08034243号
        </Footer>
      </Layout>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const index = state.index;
  return { index, loading: state.loading.models.prototype };
}
export default withRouter(connect(mapStateToProps)(Layouts));
