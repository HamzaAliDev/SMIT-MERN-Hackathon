import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Participations = ({ navigation }) => {
    // Filter the events where the user has RSVP'd
    const participations = [
        {
            id: '1',
            title: 'Music Festival',
            date: '2024-12-25',
            category: 'Music',
            location: 'Los Angeles, CA',
            rsvp: true,
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
            title: 'Music Festival',
            date: '2024-12-25',
            category: 'Music',
            location: 'Los Angeles, CA',
            rsvp: true,
        },

    ]

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
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Participations</Text>
            <FlatList
                data={participations}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id}
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
});

export default Participations;
