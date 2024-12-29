import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const EventDetail = ({ route, navigation }) => {
  const { event } = route.params;  // Get the event data passed from HomePage

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>📅 {event.date}</Text>
      <Text style={styles.details}>📍 {event.location}</Text>
      <Text style={styles.details}>🏷️ {event.category}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EventDetail;
