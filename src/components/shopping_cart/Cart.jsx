import React, { useEffect, useState } from "react";
import { Button, Drawer, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartSuccessPaid from "./CartSuccessPaid";

const Cart = ({
  unApprovedReservations,
  handleDeleteCurrentReservation,
  totalAmount,
  paymentMethods,
  paymentLoading,
  setPaymentLoading,
  isCartOpen,
  cartActions,
  reservationSuccessPaid,
}) => {
  const showDrawer = () => {
    cartActions.showCart();
  };
  const onClose = () => {
    cartActions.closeCart();
  };

  return (
    <>
      <Badge className="cart_icon_badge" count={unApprovedReservations.length}>
        <Button style={{ padding: 20, width: "100%" }} onClick={showDrawer}>
          <ShoppingCartOutlined style={{ fontSize: 40 }} />
        </Button>
      </Badge>

      <Drawer title="Your cart" onClose={onClose} open={isCartOpen} width={600}>
        {!reservationSuccessPaid ? (
          unApprovedReservations.length ? (
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
                paymentMethods={paymentMethods}
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
          )
        ) : (
          <CartSuccessPaid />
        )}
      </Drawer>
    </>
  );
};
export default Cart;
