import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { useAuthStore } from './src/state/auth';
import { registerForegroundHandlers, registerOrRefreshFcmToken } from './src/services/notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const setUser = useAuthStore((s) => s.setUser);
  const loadProfile = useAuthStore((s) => s.loadProfile);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      setUser(user);
      if (user) {
        await loadProfile(user.uid);
        await registerOrRefreshFcmToken();
        registerForegroundHandlers();
      }
    });
    return () => unsub();
  }, [setUser, loadProfile]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
