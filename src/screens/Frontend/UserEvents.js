import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEventsContext } from '../../contexts/EventContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';

const UserEvents = ({ navigation }) => {
    const { events, dispatch } = useEventsContext();
    const { user } = useAuth();
    const { _id } = user
    const participations = events.filter(event => event.createdBy === _id) || [];

    // Function to handle event deletion
    const handleDeleteEvent = async (eventId) => {
        try {
            // Show confirmation dialog before deleting
            Alert.alert(
                'Delete Event',
                'Are you sure you want to delete this event?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            // Delete event locally
                            const updatedEvents = events.filter(event => event._id !== eventId);
                            dispatch({ type: 'SET_EVENTS', payload: updatedEvents });

                            // Delete event on the backend
                            await axios.delete(`${API_URL}/events/delete/${eventId}`);

                            Alert.alert('Success', 'Event has been deleted');
                        },
                    },
                ]
            );
        } catch (err) {
            console.error('Error deleting event:', err);
            Alert.alert('Error', 'An error occurred while deleting the event');
        }
    };

    const renderEventCard = ({ item }) => (
        <View style={styles.eventCard}>
            <TouchableOpacity
                style={styles.eventInfo}
                onPress={() => navigation.navigate('EventDetail', { event: item })}
            >
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDetails}>📅 {item.date}</Text>
                <Text style={styles.eventDetails}>📍 {item.address}</Text>
                <Text style={styles.eventDetails}>🏷️ {item.category}</Text>
                <Text style={styles.eventDetails}>👥 Participants: {item.participants.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEvent(item._id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Events</Text>
            <FlatList
                data={participations}
                renderItem={renderEventCard}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10,
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
    deleteButton: {
        backgroundColor: '#e63946',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default UserEvents;
