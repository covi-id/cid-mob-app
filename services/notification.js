import messaging from '@react-native-firebase/messaging';

// -- setup fcm
// -- inapp message
export function subscribe() {
   messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
   });
}

export async function getPushId() {
   let pushId = null;
   let notificationPermission = await messaging().hasPermission();
   if (notificationPermission === messaging.AuthorizationStatus.NOT_DETERMINED) {
      notificationPermission = await messaging().requestPermission();
   }
   if (notificationPermission) {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
         await messaging().registerDeviceForRemoteMessages();
      }
      pushId = await messaging().getToken();
   }
   return pushId;
}

// TODO: use when activated, not always from app start
async function setupMessaging() {
   // register push
   await messaging().registerDeviceForRemoteMessages();

   // request push permissions
   const settings = await messaging().requestPermission();

   if (settings) {
      console.log('Permission settings:', settings);
   }

   // Get the device token
   const token = await messaging().getToken();
   console.log(token);

   // Listen to whether the token changes
   messaging().onTokenRefresh((refreshedToken) => {
      console.log(refreshedToken);
   });

   messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
   });
}
