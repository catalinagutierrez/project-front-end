import PetDataActionTypes from "./pet-data.types";
import PetService from "../../services/pet-service";

// function that retrieves data for a given type of pet
export const getPetData = async (dispatch, category, params) => {
  try {
    let data = [];
    const response = await PetService.getPetData(params);

    // transform data to fit the schema used throughout the app
    response.data.animals.map((item) => {
      let photos = [];
      if (item.photos !== []) {
        item.photos.map((photo) => photos.push(photo.large));
      }
      data.push({
        id: item.id,
        name: item.name,
        species: item.species.toLowerCase(),
        age: item.age.toLowerCase(),
        gender: item.gender.toLowerCase(),
        size: item.size.toLowerCase(),
        breed: item.breeds.primary,
        description: item.description,
        url: item.url,
        contact: item.contact,
        photos: photos,
        category: category,
      });
    });

    dispatch({
      type: PetDataActionTypes.LOAD_DATA,
      payload: { category: category, items: data },
    });
  } catch (error) {}
};

export const getPetDetails = (dispatch, id) => {
  dispatch({
    type: PetDataActionTypes.GET_PET_DETAILS,
    payload: id,
  });
};

export const addPet = (dispatch, item) => {
  dispatch({
    type: PetDataActionTypes.ADD_PET,
    payload: item,
  });
};
