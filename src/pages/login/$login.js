import React from "react";
import { Button, Form, Icon, Input,Steps} from "antd";
import { connect } from "dva";
import router from "umi/router";

const FormItem = Form.Item;
const Step = Steps.Step;
class Index extends React.Component {
  //返回跳转
  routerGo = type => {
    if (type === "return") {
      router.push("/");
    }
  };
//获取表单值传送
  handleSubmit = e => {
    e.preventDefault(); //固定格式
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props);
        console.log("Received values of form: ", values);
        console.log(values);
        this.props.dispatch({
          type: "login/login",
          payload: values
        });
      }
    });
  };
  //样式
  render() {
    const windowHight = document.documentElement.clientHeight;
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{ padding: "120px 12%", height: windowHight - 60 }}
        className="bac2_img"
      >
        <Steps direction="vertical" current={0}  className="left">
        <Step title=<span  className="red">登录</span> description=<span  className="red">请输入您的登录账号和密码</span> />
        <Step title=<span  className="red">填写信息</span> description=<span  className="red">请填写需要存入快递的信息</span> />
        <Step title=<span  className="red">管理</span> description=<span  className="red">进行快递信息的管理</span> />
      </Steps>
      <div style={{display:"inline-block", width: "40%"}}>
          <Form
            onSubmit={this.handleSubmit} //Submit 表单获取数据
            style={{ margin: "0px auto", width: "100%", opacity: "0.9" }}
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
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button><br/>
              <Button
                type="primary"
                className="login-form-button"
                onClick={() => this.routerGo("return")}
              >
                返回
              </Button>
            </FormItem>
          </Form>
  </div>
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
