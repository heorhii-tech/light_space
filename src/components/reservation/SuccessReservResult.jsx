import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";
import CustomLoader from "../common/skeletons/CustomLoader";

function SuccessResult({
  reservDate,
  currentTable,
  formatDate,
  formatTime,
  closeModal,
  amount,
  isPaymentLoading,
  cartActions,
}) {
  return (
    <Card
      sx={{
        textAlign: "center",
        padding: "20px",
        maxWidth: {
          xs: "340px",
          sm: "600px",
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
        Successfully added {currentTable.tableID} table in your cart
      </Typography>
      <CheckCircleOutlineIcon
        sx={{ fontSize: 80, color: "#6DBE45", marginTop: "20px" }}
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{ marginTop: "10px", marginBottom: "5px", fontSize: "16px" }}
        >
          From: {formatTime(reservDate.startDate)}{" "}
          {formatDate(reservDate.startDate)}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          To: {formatTime(reservDate.endDate)} {formatDate(reservDate.endDate)}
        </Typography>

        <Button
          variant="contained"
          className="primary-button button"
          sx={{
            backgroundColor: "#687D6B",
            borderRadius: "12px",
          }}
          onClick={closeModal}
        >
          BOOK MORE
        </Button>

        <Button
          onClick={() => {
            cartActions.showCart();
            closeModal();
          }}
          variant="contained"
          className="button"
          sx={{
            marginTop: "12px",
            borderRadius: "12px",
          }}
        >
          Pay
        </Button>
      </CardContent>
    </Card>
  );
}

export default SuccessResult;
