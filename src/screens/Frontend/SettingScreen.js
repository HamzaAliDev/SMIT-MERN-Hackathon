import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

export default function SettingScreen() {
  const navigation = useNavigation();
  const {dispatch} = useAuth();

  // Sample user data (Replace with actual data)
  const user = {
    name: "xyz",
    profilePic: "",
    bio: "here is bio",
  };

  // Menu items with labels, icons, and actions
  const menuItems = [
    {
      label: 'Edit Profile',
      icon: 'user',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      label: 'Events',
      icon: 'calendar',
      onPress: () => navigation.navigate('UserEvents'),
    },
    {
      label: 'Participations',
      icon: 'check-circle',
      onPress: () => navigation.navigate('Participations'),
    },
    {
      label: 'Log Out',
      icon: 'log-out',
      onPress: async () => {
        await AsyncStorage.removeItem('token');
        // You can dispatch logout action here if using a context
        dispatch({ type: 'LOGOUT' }); 
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user?.profilePic || 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.profileBio}>{user?.bio || 'Bio'}</Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuLabelWrapper}>
                <FeatherIcon
                  name={item.icon}
                  size={20}
                  color="#4A4A4A"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 12,
  },
  profileBio: {
    fontSize: 14,
    color: '#6C6C6C',
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#4A4A4A',
  },
});
