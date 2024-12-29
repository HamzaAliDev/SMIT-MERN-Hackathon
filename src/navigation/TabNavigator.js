import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library

import Home from '../screens/Frontend/Home';
import CreateEvent from '../screens/Frontend/CreateEvent';
import SettingScreen from '../screens/Frontend/SettingScreen';
import Participations from '../screens/Frontend/Participations';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Assign icons based on the route name
          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'CreateEvent') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Participations') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'SettingScreen') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'UserProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fca311', // Active tab color
        tabBarInactiveTintColor: 'black', // Inactive tab color
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="CreateEvent" component={CreateEvent} />
      <Tab.Screen name="Participations" component={Participations} /> 
      <Tab.Screen name="SettingScreen" component={SettingScreen} /> 
      {/* <Tab.Screen name="UserProfile" component={UserProfile} /> */}
    </Tab.Navigator>
  );
}
