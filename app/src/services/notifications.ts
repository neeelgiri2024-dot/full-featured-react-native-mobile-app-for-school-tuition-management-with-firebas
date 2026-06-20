import messaging from '@react-native-firebase/messaging';
import { auth, db } from './firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function requestPermissions() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

export async function registerOrRefreshFcmToken() {
  const user = auth.currentUser;
  if (!user) return;
  const enabled = await requestPermissions();
  if (!enabled) return;
  const token = await messaging().getToken();
  if (token) {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { pushTokens: arrayUnion(token) }).catch(() => {});
  }
}

export function registerForegroundHandlers() {
  messaging().onMessage(async (remoteMessage) => {
    // In MVP, we can log or navigate to Notifications screen
    console.log('FCM Message Data:', remoteMessage.data);
  });
}
