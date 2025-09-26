"use client";

import type { FormProps } from "antd";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

const { Title, Text } = Typography;
const { Password } = Input;

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export function RegisterForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<SignupFormData>["onFinish"] = (data) => {
    setLoading(true);
    console.log("Form data:", data);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onFinishFailed: FormProps<SignupFormData>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mx-auto ">
      <Card className="max-w-md mx-auto shadow-lg">
        <Form
          form={form}
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input size="large" placeholder="John" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input size="large" placeholder="Smith" className="rounded-lg" />
            </Form.Item>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              size="large"
              placeholder="example@gmail.com"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Password
              size="large"
              placeholder="••••••••"
              className="rounded-lg"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Password
              size="large"
              placeholder="••••••••"
              className="rounded-lg"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="agreeToTerms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              I have read and agree to roqit&apos;s Terms and conditions
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 text-lg font-medium bg-green-900 hover:bg-green-800 border-none rounded-lg"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-green-900 hover:underline">
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
