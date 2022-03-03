import { combineReducers } from "redux";

import cartDropdownReducer from "./cart-dropdown/cart-dropdown.reducer";

export default combineReducers({
  cartDropdown: cartDropdownReducer,
});
