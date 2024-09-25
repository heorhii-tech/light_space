import React from "react";
import { Button, Result, Modal } from "antd";

const SuccesResult = ({
  title,
  subTitle,

  isModalOpen,
  handleCancel,
}) => {
  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
      <Result
        status="success"
        title={title}
        subTitle={subTitle}
        extra={[
          <Button onClick={handleCancel} type="primary" key="console">
            Close
          </Button>,
        ]}
      />
    </Modal>
  );
};

export default SuccesResult;
