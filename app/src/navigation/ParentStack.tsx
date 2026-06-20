import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentProgressScreen from '../screens/common/StudentProgressScreen';
import FeesScreen from '../screens/common/FeesScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function ParentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Progress" component={StudentProgressScreen} />
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
