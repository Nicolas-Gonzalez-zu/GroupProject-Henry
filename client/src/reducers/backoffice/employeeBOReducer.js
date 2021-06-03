import * as actionType from '../../actions/backoffice/types';

const initialState = {
  employees: [],
};

const employeeBOReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_EMPLOYEES:
      return { ...state, employees: [...action.payload] };
    default:
      return { ...state };
  }
};

export default employeeBOReducers;
