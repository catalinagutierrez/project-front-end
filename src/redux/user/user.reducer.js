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
            (item) => item._id !== action.payload._id
          ),
        },
      };

    case UserActionTypes.ADD_POSTED_ITEM:
      return {
        currentUser: {
          ...state.currentUser,
          postedItems: [...state.currentUser.postedItems, action.payload],
        },
      };

    case UserActionTypes.REMOVE_POSTED_ITEM:
      return {
        currentUser: {
          ...state.currentUser,
          postedItems: state.currentUser.postedItems.filter(
            (item) => item._id !== action.payload._id
          ),
        },
      };

    case UserActionTypes.LOAD_RELATED_ITEMS:
      return {
        currentUser: {
          ...state.currentUser,
          postedItems: action.payload.postedItems,
          likedItems: action.payload.likedItems,
          following: action.payload.following,
          adoptedItems: action.payload.adoptedItems,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
