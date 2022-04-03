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
        data: state.data.map((content) =>
          content.title === action.payload.category
            ? { ...content, items: [...action.payload.items] }
            : content
        ),
      };

    default:
      return state;
  }
};

export default animalDataReducer;
