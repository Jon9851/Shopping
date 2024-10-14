import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

// Creating context for the shop
export const ShopContext = createContext(null);

// Helper function to initialize the cart with default values (0 for all items)
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0; // Default quantity is 0 for each product
  }
  return cart;
};

// Provider component for the shop context
const ShopContextProvider = (props) => {
  // State to hold cart items (initialized with getDefaultCart function)
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems); // This may log the previous state because setState is async
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // Function to calculate the total cart amount (price)
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price; // Calculate total price
      }
    }
    return totalAmount;
  };

  // Function to calculate the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item]; // Sum up the quantity of each item
      }
    }
    return totalItem;
  };

  // Context value that will be passed down to components
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  // The provider component wrapping the rest of the app
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
