import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const { Text } = Typography;
import {  Typography } from "antd";

function CartSuccessPaid(props) {
  return (
    <div className="cart_success">
      <Text type="success">YOUR RESERVATION ADDED TO CURRENT RESERVATIONS</Text>
      <CheckCircleOutlineIcon
        sx={{ fontSize: 80, color: "#6DBE45", marginTop: "20px" }}
      />
    </div>
  );
}

export default CartSuccessPaid;
