import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import categoriesReducer from "./categories/categories.reducer";
import userReducer from "./user/user.reducer";

// Key is at what reducer we want to start persisting
// whitelist are the reducer that we actually want to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  directory: directoryReducer,
  categories: categoriesReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
