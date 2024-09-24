import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // 90% ширины для мобильных устройств
    sm: 500, // 500px ширина для более широких экранов
  },
  bgcolor: "background.paper",
  backgroundColor: "#e7e7e7",
  borderRadius: "22px",
  padding: {
    xs: "20px", // Паддинг для мобильных устройств
    sm: "30px", // Паддинг для более широких экранов
  },
};

export default function BasicModal({ open, handleClose, reserved, children }) {
  return (
    <Modal
      sx={{
        border: "none",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!reserved ? (
        <Box sx={style}>{children[0]}</Box>
      ) : (
        <Box sx={style}>{children[1]}</Box>
      )}
    </Modal>
  );
}
