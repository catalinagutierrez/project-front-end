import CartDropwdownActionTypes from "./cart-dropdown.types";

const INITIAL_STATE = {
  hidden: true,
};

const cartDropdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartDropwdownActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default cartDropdownReducer;
