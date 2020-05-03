import actionTypes from './actionTypes';

export default function globalReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_ORGANISATION:
      return {
        ...state,
        organisation: action.organisation,
      };
    case actionTypes.SET_URL:
      return {
        ...state,
        url: action.url,
      };
    default:
      return state;
  }
}
