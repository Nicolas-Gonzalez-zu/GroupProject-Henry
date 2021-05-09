import * as actionType from '../actions/types';

const initialState = {
  sessionData: {
    loggedIn: false,
    loggedUser: {},
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DO_LOGIN:
      return { ...state, sessionData: action.payload };
    case actionType.LOGOUT:
      return { ...state, sessionData: initialState.sessionData };
    default:
      return { ...state };
  }
};

export default loginReducer;
