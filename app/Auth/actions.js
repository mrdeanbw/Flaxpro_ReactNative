import * as types from './actionTypes';
import request, { toQueryString } from '../request';

import socket from '../sockets';
import { tempProfileData, allProfessions } from '../Components/tempDataUsers';


function loginError(data) {
  return { type: types.AUTH_ERROR, ...data };
}

function loginSuccess(data) {
  return { type: types.AUTH_SUCCESS, ...data };
}

function getAddressSuccess(data) {
  return { type: types.GET_ADDRESS_SUCCESS, ...data };
}

function createUserSuccess(data) {
  socket.init(data.user._id);
  return {
    type: types.CREATE_USER_SUCCESS, ...data
  };
}

function createUserError(error) {
  return { type: types.CREATE_USER_ERROR, error };
}

export const createUser = (email, password, token=null) => async (dispatch, store) => {

  const url = '/auth/register';
  const options = {
    method: 'post',
    body: JSON.stringify({email, password}),
  };

  try {
    const response = await request(url, options);
    dispatch(createUserSuccess({...response}))
  } catch (error) {
    const error =
      `Auth Error: createUser 
      Message: ${error.message}`;
    dispatch(createUserError(error))
  }

};

export const login = (email, password, token = null) => async (dispatch, store) => {
  const url = '/auth/login';
  const options = {
    method: 'post',
    body: JSON.stringify({email, password}),
  };

  try {
    const response = await request(url, options);
    dispatch(loginSuccess({...response}))
    const userId = response.user.user;
    socket.init(userId);
  } catch (error) {
    dispatch(loginError({error: error.message}))
  }

};

export const refreshToken = () => async (dispatch, store) => {
  const { auth } = store();
  const url = '/auth/refresh/' + auth.refreshToken;
  const options = {
    method: 'get',
  };

  try {
    const response = await request(url, options, auth);
    dispatch(loginSuccess({...response}))
  } catch (error) {
    const error =
      `Auth Error: refreshToken 
      Message: ${error.message}`;
    dispatch(loginError(error))
  }

};

export const getCurrentAddress = (location) => async (dispatch, store) => {
  const { auth } = store();
  let url = '/users/location';
  const options = {
    method: 'get',
  };
  if(location){
    const queryString = toQueryString(location);
    url += '?' + queryString;
  }
  try {
    const response = await request(url, options, auth);
    dispatch(getAddressSuccess({...response}))
  } catch (error) {
    const error =
      `Auth Error: getCurrentAddress() 
      Message: ${error.message}`;
    dispatch(loginError(error))
  }
};

export const logout = () => async (dispatch, store) => {
  dispatch({ type: types.LOGOUT });
  socket.close();
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
