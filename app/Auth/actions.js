import * as types from './actionTypes';
import request, { toQueryString } from '../request';

import { tempProfileData, allProfessions } from '../Components/tempDataUsers';


function loginError(input = null) {
  return { type: types.AUTH_ERROR, input };
}

function loginSuccess({user, token}) {
  return { type: types.AUTH_SUCCESS, user, token };
}

function createUserSuccess({user, token, professions, professionalsClients}) {
  return {
    type: types.CREATE_USER_SUCCESS,
    user,
    token,
    professions,
    professionalsClients
  };
}

function createUserError(error) {
  return { type: types.CREATE_USER_ERROR, error };
}

/**
 * fake request
 */
export const createUser = (userData) => async (dispatch, store) => {
  let user = {},
    professions = [];

  let professionalsClients = null;

  for (let i = 0; i < tempProfileData.length; i++) {
    const profileData = tempProfileData[i];
    if (userData.email == profileData.email) {
      if (!profileData.professional) {
        professions = allProfessions;
      }
      professionalsClients = generateUsers(getRandomInt(10, 40), !profileData.professional)
      user = profileData;
      break;
    }
  }

  user.professional = userData.professional;
  user.name = userData.name || user.name;
  user.age = userData.age || user.age;

  dispatch(createUserSuccess({user, token: user.token, professions, professionalsClients}));
};
/**
 * request to server
 */
export const createUserServer = (email, password) => async (dispatch, store) => {

  const url = '/auth/register';
  const options = {
    method: 'post',
    body: JSON.stringify({email, password}),
  };

  try {
    const response = await request(url, options);
    dispatch(createUserSuccess(response))
  } catch (error) {
    dispatch(createUserError(error.message))
  }

};


export const login = (email, password, token = null) => async (dispatch, store) => {
  /**
   * fake request
   */
  let user = null,
    professions = [];

  let professionalsClients = null;

  for (let i = 0; i < tempProfileData.length; i++) {
    const profileData = tempProfileData[i];
    if (email == profileData.email && (!token || token == profileData.token)) {
      if (!profileData.professional) {
        professions = allProfessions;
      }
      professionalsClients = generateUsers(getRandomInt(10, 40), !profileData.professional)
      user = profileData;
      break;
    }
  }

  dispatch({ type: types.LOGIN, professions, professionalsClients });

  /**
   * request to server
   */
  const url = '/auth/login';
  const options = {
    method: 'post',
    body: JSON.stringify({email, password}),
  };

  try {
    const response = await request(url, options);
    dispatch(loginSuccess(response))
  } catch (error) {
    dispatch(loginError(error))
  }

};

export const logout = () => async (dispatch, store) => {
  dispatch({ type: types.LOGIN });
};

function generateUsers(count, prof) {
  let users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: randomString(),
      email: prof ? `professional${i + 1}@mail.com` : `client${i + 1}@mail.com`,
      // token: "78dsf7834nh7dsf62-3bhj77234b6fds89",
      avatar: '../Assets/images/avatar.png',
      clients: [],
      reviews: []/*generateReview(getRandomInt())*/,
      name: `${prof ? 'Professional' : 'Client'} Name${i}`,
      professional: prof,
      professions:  null,
      age: getRandomInt(20, 40),
      gender: Boolean(Math.round(Math.random())) ? "Male" : "Female",
      visibility: Boolean(Math.round(Math.random())),
      certification: prof ? "Certified Personal Professional" : null,
      preferredLocation: null,
      phone : '+1-956-587-8545',
      weight : getRandomInt(60, 95),
      height : getRandomInt(165, 180),
      fitnessLevel : 0,
      allergies : [],
      injuries : [],
    })
  }

  return users;
}

function generateReview(count) {
  let reviews = [];

  for (let i = 0; i < count; i++) {
    reviews.push({
      rating: getRandomInt(1, 5),
      review: `review ${randomString(100)}`
    });
  }

  return reviews;
}

function generateProfessions(count) {
  let professions = [],
    repeatProfessions = [];

  for (let i = 0; i < count; i++) {
    const profession = allProfessions[getRandomInt(0, allProfessions.length - 1)];
    if (findIdInArray(profession.id, repeatProfessions)){
      count += 1;
    } else {
      professions.push({
        ...profession,
        price: getRandomInt(50, 250)
      })
    }
  }

  return professions;
}

function findIdInArray(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) return true;
  }
  return false;
}

function randomString(len = 10, charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
  // return Math.random().toString(36).substring(len);
}

function getRandomInt(min = 0, max = 5) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
