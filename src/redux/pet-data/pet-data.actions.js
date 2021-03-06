import PetDataActionTypes from "./pet-data.types";
import PetService from "../../services/pet-service";
import LocalPetService from "../../services/local-pet-service";

// function that retrieves data for a given type of pet
export const getPetData = async (dispatch) => {
  let data = [];
  //first load local results
  const localData = await LocalPetService.getAllPets();
  localData.forEach((item) => {
    data.push(item);
  });

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
          _id: item.id.toString(),
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
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: PetDataActionTypes.LOAD_DATA,
    payload: data,
  });
};

export const getPetDetails = async (id) => {
  //first try to fetch the details from the local db if the id matches the database schema
  // Status 400 means that the id does not belong ot the local db.
  if (id.length === 24) {
    try {
      const response = await LocalPetService.findPetById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
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

export const deletePet = async (dispatch, pet) => {
  const response = await LocalPetService.deletePet(pet._id);
  if (response === 200) {
    dispatch({
      type: PetDataActionTypes.DELETE_PET,
      payload: pet._id,
    });
  }
};
