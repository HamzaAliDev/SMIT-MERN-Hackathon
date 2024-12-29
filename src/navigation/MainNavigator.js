import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import AuthNavigator from './AuthNavigator'
// import TabNavigator from './TabNavigator';
import AppNavigator from './AppNavigator';
import { useAuth } from '../contexts/AuthContext';

export default function MainNavigator() {
    const {user} = useAuth();

  return (
   <NavigationContainer>
    {user ?  <AppNavigator />: <AuthNavigator />}
   </NavigationContainer>
  )
}
