import { getItem, setItem, deleteItem } from '../utils/secureStore';

export async function getStatus() {
   return getItem('status');
}

export async function saveStatus(status) {
   await setItem('status', status);
}

export async function deleteStatus() {
   await deleteItem('status');
}
