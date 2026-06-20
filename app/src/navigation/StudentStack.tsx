import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultsScreen from '../screens/common/ResultsScreen';
import AttendanceScreen from '../screens/common/AttendanceScreen';
import FeesScreen from '../screens/common/FeesScreen';
import ScheduleScreen from '../screens/common/ScheduleScreen';
import ActivityFeedScreen from '../screens/common/ActivityFeedScreen';
import GalleryScreen from '../screens/common/GalleryScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';
import StudentDetailScreen from '../screens/common/StudentDetailScreen';

const Stack = createNativeStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Feed" component={ActivityFeedScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
    </Stack.Navigator>
  );
}
