import { UserActionTypes } from "./user.types";
import UserService from "../../services/user-service";

export const signIn = async (dispatch, credentials) => {
  const user = await UserService.findUserByEmail(credentials.email);
  if (user.password === credentials.password) {
    dispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: user,
    });
  } else {
    throw new Error();
  }
};

export const signUp = async (dispatch, user) => {
  const existingUser = await UserService.findUserByEmail(user.email);
  if (!existingUser) {
    const newUser = await UserService.createUser(user);
    dispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: newUser[0],
    });
  } else {
    throw new Error();
  }
};

export const signOut = (dispatch) => {
  dispatch({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: null,
  });
};

export const updateUser = async (dispatch, user) => {
  const updatedUser = await UserService.updateUser(user._id, user);
  dispatch({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: updatedUser,
  });
};
