import { DATA } from "./data";

const INITIAL_STATE = {
  categories: DATA,
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default categoriesReducer;
