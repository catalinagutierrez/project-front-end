import CartActionTypes from "./cart.types";

export const toggleCartHidden = (dispatch) => {
  dispatch({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
  });
};

export const addItem = (dispatch, item) => {
  dispatch({
    type: CartActionTypes.ADD_ITEM,
    payload: item,
  });
};

export const removeItem = (dispatch, item) => {
  dispatch({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item,
  });
};

export const clearCart = (dispatch) =>
  dispatch({
    type: CartActionTypes.CLEAR_CART,
  });
