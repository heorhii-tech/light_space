const { useState, useEffect } = require("react");
const useCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartActions = {
    showCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  };

  return { isCartOpen, cartActions };
};

export default useCart;
