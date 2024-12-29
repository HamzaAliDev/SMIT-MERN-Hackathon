import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';

export default function EditProfile({ navigation }) {
  // State for user information
  const [name, setName] = useState('John Doe'); // Default or fetched value
  const [bio, setBio] = useState('Write your bio here'); // Default or fetched value
  const [profilePic, setProfilePic] = useState('');

  // Handle image selection using Document Picker
  const handleImagePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Only allow image selection
      });

      if (result && result[0]?.uri) {
        setProfilePic(result[0].uri); // Update the profile picture state
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document: ', err);
        Alert.alert('Error', 'Could not select the image.');
      }
    }
  };

  // Save profile changes
  const handleSave = () => {
    // Here, you would typically make an API call to update the user profile
    Alert.alert('Profile Updated', 'Your profile has been successfully updated!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <FeatherIcon name="user" size={50} color="#ccc" />
            </View>
          )}
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        {/* Name Input */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        {/* Bio Input */}
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your bio"
          multiline
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#007BFF',
    marginTop: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: '#6C6C6C',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
