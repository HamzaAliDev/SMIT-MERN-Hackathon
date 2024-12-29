import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useEventsContext } from '../../contexts/EventContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';

const Home = ({ navigation }) => {
  const { events, dispatch } = useEventsContext();
  const { user } = useAuth()
  // console.log("events", events)
  // console.log("user", user)

  const { _id } = user
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' or 'past'

  // Function to filter events based on date
  const filterEvents = () => {
    const currentDate = new Date();

    if (filter === 'upcoming') {
      return events.filter((event) => new Date(event.date) > currentDate);
    } else {
      return events.filter((event) => new Date(event.date) <= currentDate);
    }
  };

  // Modify the handleRSVP function to update the backend
const handleRSVP = async (eventId) => {
  try {
    // Update the participants list locally
    const updatedEvent = events.map((event) =>
      event._id === eventId
        ? {
            ...event,
            participants: event.participants.includes(_id)
              ? event.participants.filter((userId) => userId !== _id) // Remove user ID
              : [...event.participants, _id], // Add user ID
          }
        : event
    );

    // Dispatch updated event list to update state
    dispatch({ type: 'SET_EVENTS', payload: updatedEvent });

    // Send the updated participants to the backend
    await axios.put(`${API_URL}/events/update/${eventId}`, {
      participants: updatedEvent.find((event) => event._id === eventId).participants,
    });

  } catch (err) {
    console.error("Error updating RSVP:", err);
  }
};


  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDetails}>📅 {item.date}</Text>
        <Text style={styles.eventDetails}>📍 {item.address}</Text>
        <Text style={styles.eventDetails}>🏷️ {item.category}</Text>
        <Text style={styles.eventDetails}>👥 Participants: {item.participants.length}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.rsvpButton,
          item.participants.includes(_id) && styles.rsvpButtonActive,
        ]}
        onPress={() => handleRSVP(item._id)}
      >
        <Text style={styles.rsvpButtonText}>
          {item.participants.includes(_id) ? 'Cancel RSVP' : 'RSVP'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filterEvents()}
      renderItem={renderEventCard}
      keyExtractor={(item) => item._id} // Use _id as the key
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Events</Text>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'upcoming' && styles.filterButtonActive]}
              onPress={() => setFilter('upcoming')}
            >
              <Text style={styles.filterButtonText}>Upcoming </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'past' && styles.filterButtonActive]}
              onPress={() => setFilter('past')}
            >
              <Text style={styles.filterButtonText}>Past Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    width: "40%",
    backgroundColor: '#14213d',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#fca311',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    paddingStart: 8,
    paddingTop: 5,
    fontSize: 26,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#14213d",
    // textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rsvpButton: {
    backgroundColor: '#14213d',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  rsvpButtonActive: {
    backgroundColor: '#fca311',
  },
  rsvpButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Home;
