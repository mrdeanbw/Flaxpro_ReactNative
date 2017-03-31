import * as types from './actionTypes';

import { tempProfileData, allProfessions } from '../Components/tempDataUsers';

export const createUser = (userData) => async (dispatch, store) => {
  setTimeout(() => {
    let user = null,
      professions = [];

    let coachesClients = null;

    for (let i = 0; i < tempProfileData.length; i++) {
      const profileData = tempProfileData[i];
      if (userData.email == profileData.email) {
        if (!profileData.professional) {
          professions = allProfessions;
        }
        coachesClients = generateUsers(getRandomInt(10, 40), !profileData.professional)
        user = profileData;
        break;
      }
    }

    dispatch({ type: types.CREATE_USER, user, professions, coachesClients });
  }, 1000);
};

export const login = (email, password, token = null) => async (dispatch, store) => {
  // console.log('email: ', email, 'password: ', password);
  // const response = await fetch(`apiEndpoint/...`, {
  //   headers: { }
  // });
  // let comments = [];
  // if (response.status === 200) comments = await response.json(); else console.log(response);

  setTimeout(() => {
    let user = null,
      professions = [];

    let coachesClients = null;

    for (let i = 0; i < tempProfileData.length; i++) {
      const profileData = tempProfileData[i];
      if (email == profileData.email && (!token || token == profileData.token)) {
          if (!profileData.professional) {
            professions = allProfessions;
          }
          coachesClients = generateUsers(getRandomInt(10, 40), !profileData.professional)
          user = profileData;
          break;
      }
    }

    dispatch({ type: types.LOGIN, user, professions, coachesClients });
  }, 1000);
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
      token: "78dsf7834nh7dsf62-3bhj77234b6fds89",
      avatar: require('../Assets/avatar.png'),
      clients: [],
      coaches: [],
      reviews: generateReview(getRandomInt()),
      name: `${prof ? 'Professional' : 'Client'} Name${i}`,
      professional: prof,
      professions: prof ? generateProfessions(getRandomInt(1, allProfessions.length - 1)) : null,
      age: getRandomInt(20, 40),
      gender: Boolean(Math.round(Math.random())) ? "Male" : "Female",
      visibility: Boolean(Math.round(Math.random())),
      certification: prof ? "Certified Personal Trainer" : null,
      preferredLocation: null,
      birthday : '10.01.1991',
      phoneNumber : '+1-956-587-8545',
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
