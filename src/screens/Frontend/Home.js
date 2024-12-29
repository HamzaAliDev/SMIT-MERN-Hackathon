import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';

const Home = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: '2024-12-30',
      category: 'Tech',
      description: 'here is the description of my event',
      location: 'San Francisco, CA',
      rsvp: false,
    },
    {
      id: '2',
      title: 'Music Festival',
      date: '2024-12-25',
      category: 'Music',
      location: 'Los Angeles, CA',
      rsvp: true,
    },
    {
      id: '3',
      title: 'Sports Meetup',
      date: '2024-12-15',
      category: 'Sports',
      location: 'New York, NY',
      rsvp: false,
    },
    {
      id: '4',
      title: 'Sports Meetup',
      date: '2024-12-15',
      category: 'Sports',
      location: 'New York, NY',
      rsvp: false,
    },
    {
      id: '5',
      title: 'Sports Meetup',
      date: '2024-12-15',
      category: 'Sports',
      location: 'New York, NY',
      rsvp: false,
    },
    {
      id: '6',
      title: 'Sports Meetup',
      date: '2024-12-15',
      category: 'Sports',
      location: 'New York, NY',
      rsvp: false,
    },
    {
      id: '7',
      title: 'Sports Meetup',
      date: '2024-12-15',
      category: 'Sports',
      location: 'New York, NY',
      rsvp: false,
    },
  ]);

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

  const handleRSVP = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, rsvp: !event.rsvp } : event
      )
    );
  };

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDetails}>📅 {item.date}</Text>
        <Text style={styles.eventDetails}>📍 {item.location}</Text>
        <Text style={styles.eventDetails}>🏷️ {item.category}</Text>
      </View>
      <TouchableOpacity
        style={[styles.rsvpButton, item.rsvp && styles.rsvpButtonActive]}
        onPress={() => handleRSVP(item.id)}
      >
        <Text style={styles.rsvpButtonText}>
          {item.rsvp ? 'Cancel RSVP' : 'RSVP'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filterEvents()}
      renderItem={renderEventCard}
      keyExtractor={(item) => item.id}
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
    paddingStart : 8,
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
