import * as types from './actionTypes';

import { tempProfileData } from '../Components/tempDataUsers';

export const signup = (email, password) => async (dispatch, store) => {
  setTimeout(() => {
    let user = null;
    for (let i = 0; i < tempProfileData.length; i++) {
      const profileData = tempProfileData[i];
      if (email == profileData.email) {
        user = profileData;
        break;
      }
    }

    dispatch({ type: types.SIGNUP, user });
  }, 3000);
};

export const login = (email, password) => async (dispatch, store) => {
  // console.log('email: ', email, 'password: ', password);
  // const response = await fetch(`apiEndpoint/...`, {
  //   headers: { }
  // });
  // let comments = [];
  // if (response.status === 200) comments = await response.json(); else console.log(response);

  setTimeout(() => {
    let user = null;
    for (let i = 0; i < tempProfileData.length; i++) {
      const profileData = tempProfileData[i];
      if (email == profileData.email) {
        user = profileData;
        break;
      }
    }

    dispatch({ type: types.LOGIN, user });
  }, 3000);
};

export const logout = () => async (dispatch, store) => {
  dispatch({ type: types.LOGIN });
}