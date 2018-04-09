import React from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Button,
  Form,
  Icon,
  Input,
  Checkbox
} from "antd";
import { connect } from "dva";
const FormItem = Form.Item;

class Index extends React.Component {
  render() {
    const windowHight = document.documentElement.clientHeight;
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{ padding: "60px 12%", height: windowHight - 60 }}
        className="bac_img"
      >


        <Form onSubmit={this.handleSubmit} style={{margin:"0px auto", width:"40%"}} >
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
            登录
            </Button>

          </FormItem>
        </Form>


      </div>
    );
  }
}

// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const index = state.index;
  return { index, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Form.create()(Index));
