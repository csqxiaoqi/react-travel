import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./registerForm.module.css";
import axios from "axios";
export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    try {
      axios
        .post("http://123.56.149.216:8080/auth/register", {
          email: values.username,
          password: values.password,
          confirmPassword: values.confirm,
        })
        .then(() => {
          navigate("/signin");
        });
    } catch (error) {
      alert("注册失败！");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("两次密码验证错误");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
