import { loginAPI } from "@/services/api";
import { App, Button, Divider, Form, FormProps, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const [form] = Form.useForm();
  const { notification, message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.email || "", values.password || "");
    if (res.data) {
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập tài khoản thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
    setLoading(false);
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
          form={form}
        >
          <Title level={2} style={{ textAlign: "left" }}>
            Đăng nhập
            <Divider />
          </Title>

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

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
              loading={loading}
            >
              Đăng nhập
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
              Chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
