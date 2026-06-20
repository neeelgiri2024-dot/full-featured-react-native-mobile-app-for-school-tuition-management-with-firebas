import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import MarksEntryScreen from '../screens/teacher/MarksEntryScreen';
import AnnouncementsScreen from '../screens/teacher/AnnouncementsScreen';

const Stack = createNativeStackNavigator();

export default function TeacherStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Marks" component={MarksEntryScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
    </Stack.Navigator>
  );
}
