import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
// import Chat from '../screens/Frontend/Chat';

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   <AppStack.Navigator>
    <AppStack.Screen name='Tab' component={TabNavigator} options={{ headerShown: false }} />
    {/* <AppStack.Screen name='Chat' component={Chat} /> */}

   </AppStack.Navigator>
  )
}
