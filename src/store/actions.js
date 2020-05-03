import actionTypes from './actionTypes';

function setOrganisation(organisation) {
  return { type: actionTypes.SET_ORGANISATION, organisation };
}

function setURL(url) {
  return { type: actionTypes.SET_URL, url };
}

module.exports = {
  setOrganisation,
  setURL,
};
