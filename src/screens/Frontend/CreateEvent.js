import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const CreateEvent = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); // State for showing date picker
    const [type, setType] = useState(''); // New state for event type
    const [errors, setErrors] = useState({});


    const handleSubmit = async () => {
        // Clear previous errors
        setErrors({});

        // Custom validation
        const validationErrors = {};

        if (!title) validationErrors.title = 'Event title is required';
        if (!description) validationErrors.description = 'Event description is required';
        if (!date) validationErrors.date = 'Event date is required';
        if (!location) validationErrors.location = 'Event location is required';
        if (!category) validationErrors.category = 'Event category is required';
        if (!type) validationErrors.type = 'Event type is required'; // Validate type

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // If no errors, handle the event creation
            console.log('Event Created:', { title, description, date, location, category, type });

            let currentEvent = { title, description, date, address: location, category, eventType: type }
            console.log("currentEvent", currentEvent)
            try {
                const { data } = await axios.post('http://172.16.50.26:8000/events/create', currentEvent)
                console.log("data", data)
                // const response = await axios.post('http://172.16.50.26:8000/events/create', { test: "data" });
                // console.log(response.data);


            } catch (error) {
                console.error("Full error:", error);
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    console.error("Error response headers:", error.response.headers);
                } else {
                    console.error("Error message:", error.message);
                }
            }
            // Navigate back after submitting
            navigation.goBack();
            setTitle('')
            setDescription('')
            setDate('')
            setType('')
            setLocation('')
            setCategory('')

        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const showDatePickerDialog = () => {
        setShowDatePicker(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Event</Text>

            {/* Event Title */}
            <TextInput
                style={styles.input}
                placeholder="Event Title"
                onChangeText={setTitle}
                value={title}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

            {/* Event Description */}
            <TextInput
                style={styles.input}
                placeholder="Event Description"
                multiline
                numberOfLines={4}
                onChangeText={setDescription}
                value={description}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            {/* Event Location */}
            <TextInput
                style={styles.input}
                placeholder="Event Location"
                onChangeText={setLocation}
                value={location}
            />
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            {/* Event Category */}
            <TextInput
                style={styles.input}
                placeholder="Event Category"
                onChangeText={setCategory}
                value={category}
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

            {/* Event Date */}
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatePickerDialog}>
                <Text style={styles.datePickerText}>{date ? date.toLocaleDateString() : 'Select Event Date'}</Text>
            </TouchableOpacity>
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            {/* Show DateTimePicker if showDatePicker is true */}
            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            {/* Event Type */}
            <View style={styles.radioGroup}>
                <Text style={styles.radioLabel}>Event Type:</Text>
                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setType('Public')}
                    >
                        <Text style={type === 'Public' ? styles.radioSelected : styles.radioText}>
                            Public
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setType('Private')}
                    >
                        <Text style={type === 'Private' ? styles.radioSelected : styles.radioText}>
                            Private
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}


            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Create Event</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    datePickerButton: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
    },
    radioGroup: {
        marginVertical: 15,
    },
    radioLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioOption: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    radioText: {
        fontSize: 16,
        color: '#333',
    },
    radioSelected: {
        fontSize: 16,
        color: '#fca311',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#14213d',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#e5e5e5',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default CreateEvent;


