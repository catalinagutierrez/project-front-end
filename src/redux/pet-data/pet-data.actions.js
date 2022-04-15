import PetDataActionTypes from "./pet-data.types";
import PetService from "../../services/pet-service";

// function that retrieves data for a given type of pet
export const getPetData = async (dispatch) => {
  try {
    let data = [];
    const response = await PetService.getPetData();

    // transform data to fit the schema used throughout the app
    response.data.animals.forEach((item) => {
      if (
        (item.species.toLowerCase() === "cat" ||
          item.species.toLowerCase() === "dog") &&
        item.photos.length > 0
      ) {
        let photos = [];
        item.photos.map((photo) => photos.push(photo.large));
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
        });
      }
    });

    dispatch({
      type: PetDataActionTypes.LOAD_DATA,
      payload: data,
    });
  } catch (error) {}
};

export const getPetDetails = async (id) => {
  try {
    const response = await PetService.getPetDetails(id);
    const item = response.data.animal;
    let photos = [];
    if (item.photos !== []) {
      item.photos.map((photo) => photos.push(photo.large));
    }
    return {
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
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addPet = (dispatch, item) => {
  dispatch({
    type: PetDataActionTypes.ADD_PET,
    payload: item,
  });
};

export const getbreeds = async (type) => {
  let breeds = [];
  try {
    const response = await PetService.getBreeds(type);
    response.data.breeds.map((breed) => breeds.push(breed.name));
  } catch (error) {
    console.log(error);
  }
  return breeds;
};

export const searchByName = async (queryString) => {
  try {
    const response = await PetService.searchByName(queryString);
    let results = [];

    // transform data to fit the schema used throughout the app
    response.data.animals.forEach((item) => {
      if (
        (item.species.toLowerCase() === "cat" ||
          item.species.toLowerCase() === "dog") &&
        item.photos.length > 0
      ) {
        let photos = [];
        item.photos.map((photo) => photos.push(photo.large));

        results.push({
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
        });
      }
    });

    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
