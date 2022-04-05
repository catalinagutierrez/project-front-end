import PetDataActionTypes from "./pet-data.types";
import PetService from "../../services/pet-service";

// function that retrieves data for a given type of pet
export const getPetData = async (dispatch, category, params) => {
  try {
    const response = await PetService.getPetData(params);
    dispatch({
      type: PetDataActionTypes.LOAD_DATA,
      payload: { category: category, items: response.data.animals },
    });
  } catch (error) {}
};
