import React from "react";
import { Button, Form, Icon, Input } from "antd";
import { connect } from "dva";
import router from "umi/router";
const FormItem = Form.Item;

class Index extends React.Component {
  //返回跳转
  routerGo = type => {
    if (type === "return") {
      router.push("/");
    }
  };
/*  open = () => {
    console.log(this.props.login);
  };*/
  handleSubmit = e => {
    e.preventDefault(); //固定格式
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props);
        console.log("Received values of form: ", values);
        this.props.dispatch({
          type: "login/login",
          payload: values
        });
      }
    });
  };
  render() {
    const windowHight = document.documentElement.clientHeight;
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{ padding: "60px 12%", height: windowHight - 60 }}
        className="bac_img"
      >
        <card>
          <Form
            onSubmit={this.handleSubmit} //Submit 表单获取数据
            style={{ margin: "0px auto", width: "40%", opacity: "0.9" }}
          >
            <FormItem>
              {getFieldDecorator("phone_number", {
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
                onClick={this.handleSubmit}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录{this.props.login.type}
              </Button>
              <Button
                type="primary"
                className="login-form-button"
                onClick={() => this.routerGo("return")}
              >
                返回
              </Button>
            </FormItem>
          </Form>
        </card>
      </div>
    );
  }
}

// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const login = state.login;
  return { login, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Form.create()(Index));
