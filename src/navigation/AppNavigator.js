import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import EventDetail from '../screens/Frontend/EventDetail';

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   <AppStack.Navigator>
    <AppStack.Screen name='Tab' component={TabNavigator} options={{ headerShown: false }} />
    <AppStack.Screen name='EventDetail' component={EventDetail} />

   </AppStack.Navigator>
  )
}
