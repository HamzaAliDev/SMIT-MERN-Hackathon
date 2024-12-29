import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import EventDetail from '../screens/Frontend/EventDetail';
import EditProfile from '../screens/Frontend/EditProfile';
import Participations from '../screens/Frontend/Participations';
import UserEvents from '../screens/Frontend/UserEvents';

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   <AppStack.Navigator>
    <AppStack.Screen name='Tab' component={TabNavigator} options={{ headerShown: false }} />
    <AppStack.Screen name='EventDetail' component={EventDetail} />
    <AppStack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
    <AppStack.Screen name='Participations' component={Participations}  />
    <AppStack.Screen name='UserEvents' component={UserEvents} options={{ headerShown: false }} />


   </AppStack.Navigator>
  )
}
