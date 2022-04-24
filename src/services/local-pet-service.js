import axios from "axios";
const PET_API = "https://full-stack-developer-fin-proj.herokuapp.com/api/pet";

const createPet = async (item) => {
  const response = await axios({
    method: "post",
    url: PET_API,
    headers: {},
    data: {
      name: item.name,
      age: item.age,
      gender: item.gender,
      species: item.species,
      size: item.size,
      breed: item.breed,
      desription: item.description,
      photos: item.photos,
      contact: item.contact,
      url: item.url,
    },
  });
  return response.data;
};

const deletePet = async (pet) => {};

const findPetById = async (id) => {
  const response = await axios.get(`${PET_API}/${id}`);
  return response.data;
};

const getAllPets = async () => {
  const response = await axios.get(`${PET_API}`);
  return response.data;
};

const LocalPetService = {
  createPet,
  deletePet,
  findPetById,
  getAllPets,
};

export default LocalPetService;
