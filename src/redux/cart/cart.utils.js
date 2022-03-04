// prevents duplicates in the cart
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartitem) => cartitem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems;
  }

  return [...cartItems, cartItemToAdd];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};
