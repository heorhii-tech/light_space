import React from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccesResult = ({
  title,
  subTitle,

  isModalOpen,
  handleCancel,
}) => {
  return (
    <Modal
      style={{
        border: "none",
      }}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Card
        sx={{
          textAlign: "center",
          padding: "20px",
          maxWidth: {
            xs: "340px",
            sm: "500px",
          },
          transform: "translateY(50%)",
          margin: "auto",
          boxShadow: "none",
          border: "none",
          backgroundColor: "#e7e7e7",
          borderRadius: "22px",
        }}
      >
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "#6DBE45", marginTop: "20px" }}
        />
        <CardContent>
          <Typography
            variant="body1"
            sx={{ marginTop: "10px", marginBottom: "5px", fontSize: "16px" }}
          ></Typography>

          <Typography
            variant="body1"
            sx={{ marginBottom: "20px" }}
          ></Typography>

          <Button
            variant="contained"
            className="primary-button button"
            sx={{
              backgroundColor: "#687D6B",
              borderRadius: "12px",
            }}
            onClick={handleCancel}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default SuccesResult;
