import * as actionType from '../actions/types';

const initialState = {
  sessionData: {
    loggedIn: false,
    loggedUser: {},
  },
  redirect: false,
  initialized: false,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DO_LOGIN:
      return { ...state, sessionData: action.payload };
    case actionType.LOGOUT:
      return { ...state, sessionData: initialState.sessionData };
    case actionType.REDIRECT:
      return { ...state, redirect: action.payload };
    case actionType.INITIALIZE:
      return { ...state, initialized: action.payload };
    default:
      return { ...state };
  }
};

export default authReducers;
