import { getItem, setItem, deleteItem } from '../utils/secureStorage';

export async function getOrganisation() {
  return getItem('organisation');
}

export async function saveOrganisation(organisation) {
  await setItem('organisation', organisation);
}

export async function deleteOrganisation() {
  await deleteItem('organisation');
}

export async function getURL() {
  return getItem('url');
}

export async function saveURL(url) {
  await setItem('url', url);
}

export async function deleteURL() {
  await deleteItem('url');
}

export async function clearStorage() {
  await Promise.all([await deleteOrganisation(), await deleteURL()]);
}
