import { Form, Input, Button } from "antd";
import React from "react";
import { useState } from "react";

const TransferForm = ({ contract, api }) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    transfer(values);
  };

  const transfer = async ({ newOwner, number }) => {
    setLoading(true);
    try {
      const transaction = await contract.transfer(newOwner, number);
      const receipt = await transaction.wait();
      console.log(receipt);
      api.success({
        message: `Transfer Ownership Success!`,
        description: `Transferred ownership of car "${number}" to "${newOwner}"`,
        placement: "top",
      });
    } catch (exc) {
      api.error({
        message: `Transfer Ownership Failed!`,
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
        rules={[{ required: true, message: "Please enter car number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="New owner"
        name="newOwner"
        rules={[{ required: true, message: "Please enter new owner address!" }]}
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

export default TransferForm;
