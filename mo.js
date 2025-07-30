import React, { useState } from 'react';
import { Button } from 'antd';
import DateFileModal from './DateFileModal';

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={openModal}>
        Open Modal
      </Button>

      <DateFileModal visible={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ParentComponent;




import React from 'react';
import { Modal, DatePicker, Input, Form, message } from 'antd';

const DateFileModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const formattedDate = values.date.format('YYYY-MM-DD');
        const fileName = values.filename;

        message.success(`Date: ${formattedDate}, File Name: ${fileName}`);
        form.resetFields();
        onClose(); // Notify parent to close the modal
      })
      .catch(info => {
        console.log('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose(); // Notify parent to close
  };

  return (
    <Modal
      title="Select Date and File Name"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="date"
          label="Select Date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="filename"
          label="File Name"
          rules={[{ required: true, message: 'Please enter file name' }]}
        >
          <Input placeholder="Enter file name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DateFileModal;
