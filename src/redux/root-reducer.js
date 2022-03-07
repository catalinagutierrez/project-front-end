import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/cart.reducer";

// Key is at what reducer we want to start persisting
// whitelist are the reducer that we actually want to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
