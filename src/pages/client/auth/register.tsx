import { loginAPI } from "@/services/api";
import { Button, Divider, Form, FormProps, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

type FieldType = {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const res = await loginAPI("admin@gmail.com", "1234567");
    console.log("check res", res);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f2f6f8",
          height: "100vh",
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          style={{
            width: "35%",
            backgroundColor: "#fefefe",
            padding: "30px 40px",
            borderRadius: "10px",
            marginBottom: "130px",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Title level={2} style={{ textAlign: "left" }}>
            Đăng ký tài khoản
            <Divider />
          </Title>
          <Form.Item<FieldType>
            label="Họ tên"
            name="fullName"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Họ tên không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Email không được để trống" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Mật khẩu không được để trống " },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Số điện thoại không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
              onClick={() => form.submit()}
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Divider>Or</Divider>
            <p>
              Đã có tài khoản ? <a href="#">Đăng nhập</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
