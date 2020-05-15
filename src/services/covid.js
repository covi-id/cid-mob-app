import api from '../utils/api';
import { getLocation } from './location';

export async function submitQR(walletId, key) {
  const response = await api.post(`wallets/${walletId}/status`, { key });
  return response.data;
}

export async function getOrganisationQR(id) {
  const response = await api.get(`organisation/${id}`);
  return response.data;
}

export async function subtractCount(id, deviceIdentifier, url) {
  const response = await api.put(`organisation/subtract/${id}`, { deviceIdentifier }, { baseURL: url });
  return response.data;
}

export async function checkIn(id, walletId) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/check_in`, {
    walletId,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}

export async function checkOut(id, walletId) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/check_out`, {
    walletId,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}

export async function checkInMobile(id, mobileNumber) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/mobile_check_in`, {
    mobileNumber,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}

export async function checkOutMobile(id, mobileNumber) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/mobile_check_out`, {
    mobileNumber,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}
