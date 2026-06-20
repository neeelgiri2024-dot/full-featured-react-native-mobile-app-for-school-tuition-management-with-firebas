import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import AdminStack from './AdminStack';
import TeacherStack from './TeacherStack';
import StudentStack from './StudentStack';
import ParentStack from './ParentStack';
import { useAuthGate } from '../hooks/useAuthGate';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { signedIn, role } = useAuthGate();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!signedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : role === 'admin' ? (
        <Stack.Screen name="Admin" component={AdminStack} />
      ) : role === 'teacher' ? (
        <Stack.Screen name="Teacher" component={TeacherStack} />
      ) : role === 'student' ? (
        <Stack.Screen name="Student" component={StudentStack} />
      ) : (
        <Stack.Screen name="Parent" component={ParentStack} />
      )}
    </Stack.Navigator>
  );
}
