import * as actionType from '../../actions/frontoffice/types';

const initialState = {
  reports: '',
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_REPORTS:
      return { reports: action.payload };
    case actionType.RESET_REPORTS:
      return { reports: '' };
    default:
      return { ...state };
  }
};
export default reportReducer;
