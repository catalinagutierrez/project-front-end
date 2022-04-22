import axios from "axios";
const USERS_API =
  "https://full-stack-developer-fin-proj.herokuapp.com/api/user";

const createUser = async (user) => {
  const response = await axios.post(`${USERS_API}-${user.type}`, user);
  return response.data;
};

const findUserById = async (id) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

const findUserByEmail = async (email) => {
  let response;
  try {
    response = await axios.get(`${USERS_API}-buyer/email/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
    try {
      response = await axios.get(`${USERS_API}-seller/email/${email}`);
      return response.data;
    } catch (error) {
      console.log(error);
      try {
        response = await axios.get(`${USERS_API}-admin/email/${email}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  return null;
};

const deleteUser = async (user) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

const updateUser = async (user) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

const UserService = {
  createUser,
  findUserById,
  findUserByEmail,
  deleteUser,
  updateUser,
};

export default UserService;
