import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from '../screens/admin/UsersScreen';
import ClassesScreen from '../screens/admin/ClassesScreen';
import SubjectsScreen from '../screens/admin/SubjectsScreen';
import ExamsScreen from '../screens/admin/ExamsScreen';
import FeesScreen from '../screens/admin/FeesScreen';
import SchedulesScreen from '../screens/admin/SchedulesScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen name="Classes" component={ClassesScreen} />
      <Stack.Screen name="Subjects" component={SubjectsScreen} />
      <Stack.Screen name="Exams" component={ExamsScreen} />
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen name="Schedules" component={SchedulesScreen} />
    </Stack.Navigator>
  );
}
