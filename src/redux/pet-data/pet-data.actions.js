import PetDataActionTypes from "./pet-data.types";
import PetService from "../../services/pet-service";
import LocalPetService from "../../services/local-pet-service";

// function that retrieves data for a given type of pet
export const getPetData = async (dispatch) => {
  let data = [];
  //first load the local items

  //then load the first 60 matching results from the api
  try {
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
          _id: item.id,
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
  //first try to fetch the details from the local db
  try {
    const response = await LocalPetService.findPetById(id);
    return response;
  } catch (error) {
    console.log(error);
  }

  //if not found then try fetching from the api
  try {
    const response = await PetService.findPetById(id);
    const item = response.data.animal;
    let photos = [];
    if (item.photos !== []) {
      item.photos.map((photo) => photos.push(photo.large));
    }
    return {
      _id: item.id,
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
  }
};

export const addPet = async (dispatch, item) => {
  const newPet = await LocalPetService.createPet(item);
  dispatch({
    type: PetDataActionTypes.ADD_PET,
    payload: newPet[0],
  });
  return newPet[0];
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
          _id: item.id,
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
