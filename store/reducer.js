import actionTypes from './actionTypes';

export default function globalReducer(state, action) {
   switch (action.type) {
      case actionTypes.SET_STATUS:
         return {
            ...state,
            covidStatus: action.covidStatus,
         };
      default:
         return state;
   }
}
