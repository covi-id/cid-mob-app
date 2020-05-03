import * as SecureStore from 'expo-secure-store';

export async function setItem(key, value) {
  let stored = value;
  if (typeof stored !== typeof string) {
    stored = JSON.stringify(value);
  }
  await SecureStore.setItemAsync(key, stored);
}

export async function deleteItem(key) {
  await SecureStore.deleteItemAsync(key);
}

export async function getItem(key) {
  return JSON.parse(await SecureStore.getItemAsync(key));
}
