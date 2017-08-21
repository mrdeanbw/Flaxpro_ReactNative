import * as types from './actionTypes';
import * as authTypes from '../Auth/actionTypes';
import request, { toQueryString } from '../request';

function createRoleSuccess({user}) {
  return { type: authTypes.UPDATE_USER, user };
}

function questionError(error) {
  return { type: types.QUESTION_ERROR, error };
}

export const createRole = (userData) => async (dispatch, store) => {
  const url = userData.professional ? '/professionals' : '/clients';
  const { auth } = store();
  let requestData = {
    name:userData.name,
    gender:userData.gender,
    phone:userData.phone,
    visibility:userData.visibility,
    age:userData.age,
    address:userData.address,
    description:userData.description,
    professions:userData.professions,
    avatar:userData.avatar

  }
  if(userData.professional) {
    requestData = {
      name:userData.name,
      gender:userData.gender,
      visibility:userData.visibility,
      phone:userData.phone,
      age:userData.age,
      price:parseInt(userData.price),
      insured:userData.insured,
      description:userData.description,
      profession:userData.profession,
      avatar:userData.avatar,
      certification:userData.certification,
      experience:userData.experience,
      toClient:userData.toClient,
      ownSpace:userData.ownSpace,
      address:userData.address
  
    }
  }
  const options = {
    method: 'post',
    body: JSON.stringify(requestData),
  };
  try {
    const response = await request(url, options, auth);
    dispatch(createRoleSuccess(response));
  } catch (error) {
    let errorMsg =
      `Question Error: createRole(${userData.professional ? 'Professional' : 'Client'})
      Message: ${error.message}`;
    if(error.response.status === 422){
      errorMsg = 'Some fields are missing or incorrect'
    }
    dispatch(questionError(errorMsg));
  }

};

export function changeProfessionalForm({ firstForm }) {
  return { type: types.PROFESSIONALINFO_CHANGEFORM, firstForm };
}
