import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library

import Home from '../screens/Frontend/Home';
import CreateEvent from '../screens/Frontend/CreateEvent';
// import Notification from '../screens/Frontend/Notification';
// import CreatePost from '../screens/Frontend/CreatePost';
// import Friends from '../screens/Frontend/Friends';

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
          } else if (route.name === 'Post') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ac1e5f', // Active tab color
        tabBarInactiveTintColor: 'black', // Inactive tab color
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="CreateEvent" component={CreateEvent} />
      {/* <Tab.Screen name="Post" component={CreatePost} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
}
