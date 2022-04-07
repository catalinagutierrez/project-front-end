import { UserActionTypes } from "./user.types";

export const setCurrentUser = (dispatch, user) => {
  //temporary. This will be loaded from the db
  if (user) {
    user.likedItems = [];
  }
  dispatch({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
  });
};

export const addLikedItem = (dispatch, item) => {
  dispatch({
    type: UserActionTypes.ADD_LIKED_ITEM,
    payload: item,
  });
};

export const removeLikedItem = (dispatch, item) => {
  dispatch({
    type: UserActionTypes.REMOVE_LIKED_ITEM,
    payload: item,
  });
};
