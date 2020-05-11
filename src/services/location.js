import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export async function getLocation() {
  const hasPermission = await checkLocationPermission();
  let location;
  if (hasPermission) {
    location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  }
  return location;
}

export async function checkLocationPermission() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  return status === 'granted';
}
