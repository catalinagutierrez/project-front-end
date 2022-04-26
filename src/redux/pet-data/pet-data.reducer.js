import PetDataActionTypes from "./pet-data.types";

const INITIAL_STATE = {
  data: [],
};

const animalDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PetDataActionTypes.LOAD_DATA:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };

    case PetDataActionTypes.GET_PET_DETAILS:
      return {
        ...state,
        data: state.data.find((item) => item._id === action.payload),
      };

    case PetDataActionTypes.ADD_PET:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case PetDataActionTypes.DELETE_PET:
      return {
        ...state,
        data: [...state.data.filter((item) => item._id !== action.payload)],
      };

    default:
      return state;
  }
};

export default animalDataReducer;
