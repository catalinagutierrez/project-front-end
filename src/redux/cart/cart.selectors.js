// selectors take only a piece of the state and return only values that changed so that components
// dont get rerendered at every state change

import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) => accumalatedQuantity + 1,
      0
    )
);
