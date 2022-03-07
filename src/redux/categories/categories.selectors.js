import { createSelector } from "reselect";

const selectCategories = (state) => state.categories;

export const selectCategoryItems = createSelector(
  [selectCategories],
  (categories) => categories.categories
);
