import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
