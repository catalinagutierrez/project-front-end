import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        currentUser: action.payload,
      };

    case UserActionTypes.ADD_LIKED_ITEM:
      return {
        currentUser: {
          ...state.currentUser,
          likedItems: [...state.currentUser.likedItems, action.payload],
        },
      };

    case UserActionTypes.REMOVE_LIKED_ITEM:
      return {
        currentUser: {
          ...state.currentUser,
          likedItems: state.currentUser.likedItems.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };

    default:
      return state;
  }
};

export default userReducer;
