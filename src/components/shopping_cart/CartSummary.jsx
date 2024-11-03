import React, { useState } from "react";
import { Alert, Button, Space } from "antd";
const CartSummary = ({
  totalAmount,
  payByCash,
  unApprovedReservations,
  paymentLoading,
}) => {
  return (
    <Alert
      message={<h3 style={{ fontSize: "36px" }}>{totalAmount} €</h3>}
      description={``}
      type="info"
      action={
        <Space direction="vertical">
          <Button
            size="large"
            color="default"
            loading={paymentLoading}
            onClick={() => {
              payByCash(unApprovedReservations);
            }}
          >
            PUY BY CASH IN DESK
          </Button>
        </Space>
      }
    />
  );
};

export default CartSummary;
