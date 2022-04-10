import PetDataActionTypes from "./pet-data.types";

const INITIAL_STATE = {
  data: [
    {
      id: "cats",
      title: "cats",
      items: [],
    },
    {
      id: "dogs",
      title: "dogs",
      items: [],
    },
    {
      id: "kittens",
      title: "kittens",
      items: [],
    },
    {
      id: "puppies",
      title: "puppies",
      items: [],
    },
  ],
};

const animalDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PetDataActionTypes.LOAD_DATA:
      return {
        ...state,
        data: state.data.map((category) =>
          category.title === action.payload.category
            ? { ...category, items: [...action.payload.items] }
            : category
        ),
      };

    case PetDataActionTypes.GET_PET_DETAILS:
      return {
        ...state,
        data: state.data.find((item) => item.id === action.payload),
      };

    case PetDataActionTypes.ADD_PET:
      return {
        ...state,
        data: state.data.map((category) =>
          category.title === action.payload.category
            ? { ...category, items: [...category.items, action.payload] }
            : category
        ),
      };

    default:
      return state;
  }
};

export default animalDataReducer;
