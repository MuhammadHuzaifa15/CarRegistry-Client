import { Form, Input, Button } from "antd";
import React from "react";
import { useState } from "react";

const CarForm = ({ contract, api }) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    register(values);
  };

  const register = async ({ number, model, manufacturer }) => {
    setLoading(true);
    try {
      const transaction = await contract.set(number, model, manufacturer);
      const receipt = await transaction.wait();
      console.log(receipt);
      api.success({
        message: `Add New Registry Success!`,
        description: `New registry of car "${number}" is successfull!`,
        placement: "top",
      });
    } catch (exc) {
      console.log(exc);
      api.error({
        message: `Add New Registry Failed!`,
        description: exc.error.message,
        placement: "top",
      });
    }
    setLoading(false);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Number"
        name="number"
        rules={[{ required: true, message: "Please enter your car number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: "Please enter your car model!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Manufacturer"
        name="manufacturer"
        rules={[
          { required: true, message: "Please enter your manufacturer name!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
