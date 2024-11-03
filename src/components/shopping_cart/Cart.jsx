import React, { useEffect, useState } from "react";
import { Button, Drawer, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = ({
  unApprovedReservations,
  handleDeleteCurrentReservation,
  totalAmount,
  payByCash,
  paymentLoading,
  setPaymentLoading,
  isCartOpen,
  cartActions,
}) => {
  const showDrawer = () => {
    cartActions.showCart();
  };
  const onClose = () => {
    cartActions.closeCart();
  };

  return (
    <>
      <Badge count={unApprovedReservations.length}>
        <Button style={{ padding: 20 }} onClick={showDrawer}>
          <ShoppingCartOutlined style={{ fontSize: 40 }} />
        </Button>
      </Badge>

      <Drawer title="Your cart" onClose={onClose} open={isCartOpen} width={600}>
        {unApprovedReservations.length ? (
          <div className="cart-items">
            {unApprovedReservations.map((reservation) => {
              return (
                <CartItem
                  handleDeleteCurrentReservation={
                    handleDeleteCurrentReservation
                  }
                  reservation={reservation}
                />
              );
            })}
            <CartSummary
              totalAmount={totalAmount}
              payByCash={payByCash}
              unApprovedReservations={unApprovedReservations}
              paymentLoading={paymentLoading}
              setPaymentLoading={setPaymentLoading}
            />
          </div>
        ) : (
          <div
            style={{
              margin: "auto",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h3>There are no items in your cart.</h3>
            <ShoppingCartOutlined style={{ fontSize: "100px" }} />
          </div>
        )}
      </Drawer>
    </>
  );
};
export default Cart;
