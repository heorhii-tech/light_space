import React, { useState } from "react";
import { Button, Modal } from "antd";
import edit from "../../assets/edit.png";

function ModalChangeMyData({
  isModalOpen,
  handleUpdate,
  handleCancel,
  showModal,
  setData,
  data,
  placeholder,
  title,
  type,
  file,
  user,
}) {
  return (
    <>
      <Button className="edit_button" type="primary" onClick={showModal}>
        <img src={edit} />
      </Button>
      <Modal
        title={title}
       
        open={isModalOpen}
        okButtonProps={{ className: "custom-ok-button", disabled: !data }}
        cancelButtonProps={{ className: "custom-cancel-button" }}
        onOk={
          type === `text` ? handleUpdate : () => handleUpdate(file, user.uid)
        }
        onCancel={handleCancel}
      >
        {type === "text" ? (
          <input
            className="input"
            type="text"
            placeholder={placeholder}
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        ) : (
          <input
            className="input"
            type="file"
            onChange={(event) => setData(event.target.files[0])}
            required
          />
        )}
      </Modal>
    </>
  );
}

export default ModalChangeMyData;
