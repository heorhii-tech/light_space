import React, { useState } from "react";
import { Modal } from "antd";
import edit from "../../assets/edit.png";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Edit";

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
  editButtonText,
}) {
  return (
    <>
      <Button
        sx={{
          width: {
            xs: "157px", // 100% ширины для мобильных устройств
            sm: "175px", // 140px для устройств с шириной больше 600px
          },
          paddingX: {
            sm: 3,
          },
          alignSelf: "center",
        }}
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={showModal}
      >
        {editButtonText}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        okButtonProps={{ className: "custom-ok-button", disabled: !data }}
        cancelButtonProps={{ className: "custom-cancel-button" }}
        onOk={
          type === `text` || type === "number"
            ? handleUpdate
            : () => handleUpdate(file, user.uid)
        }
        onCancel={handleCancel}
      >
        {type === "text" || type === "number" ? (
          <input
            className="input"
            type={type}
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
