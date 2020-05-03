import api from '../utils/api';

export async function submitQR(id, params, url) {
  let response;
  if (!url) {
    response = await api.get('', { baseURL: id, params });
  } else {
    response = await api.get(`Verifier/${id}/covid-credentials`, { params, baseURL: url });
  }
  return response.data;
}

export async function getOrganisationQR(id, url) {
  let response;
  if (!url) {
    response = await api.get('', { baseURL: id });
  } else {
    response = await api.get(`organisation/${id}`, { baseURL: url });
  }
  return response.data;
}

export async function subtractCount(id, deviceIdentifier, url) {
  const response = await api.put(`organisation/subtract/${id}`, { deviceIdentifier }, { baseURL: url });
  return response.data;
}
