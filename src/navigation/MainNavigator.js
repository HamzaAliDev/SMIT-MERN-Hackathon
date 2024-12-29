import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import AuthNavigator from './AuthNavigator'
// import TabNavigator from './TabNavigator';
import AppNavigator from './AppNavigator';

export default function MainNavigator() {
    const isAuthenticated = true;

  return (
   <NavigationContainer>
    {isAuthenticated ?  <AppNavigator />: <AuthNavigator />}
   </NavigationContainer>
  )
}
