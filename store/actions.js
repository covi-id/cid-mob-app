import actionTypes from './actionTypes';

function setStatus(covidStatus) {
   return { type: actionTypes.SET_STATUS, covidStatus };
}

module.exports = {
   setStatus,
};
