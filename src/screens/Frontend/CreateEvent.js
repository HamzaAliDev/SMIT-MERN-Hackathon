// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, DatePickerAndroid } from 'react-native';

// const CreateEvent = ({ navigation }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [date, setDate] = useState('');
//     const [location, setLocation] = useState('');
//     const [category, setCategory] = useState('');
//     const [errors, setErrors] = useState({});

//     const handleSubmit = () => {
//         // Clear previous errors
//         setErrors({});

//         // Custom validation
//         const validationErrors = {};

//         if (!title) validationErrors.title = 'Event title is required';
//         if (!description) validationErrors.description = 'Event description is required';
//         if (!date) validationErrors.date = 'Event date is required';
//         if (!location) validationErrors.location = 'Event location is required';
//         if (!category) validationErrors.category = 'Event category is required';

//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//         } else {
//             // If no errors, handle the event creation
//             console.log('Event Created:', { title, description, date, location, category });
//             // Navigate back after submitting
//             navigation.goBack();
//         }
//     };

//     const showDatePicker = async () => {
//         if (Platform.OS === 'android') {
//             try {
//                 const { action, year, month, day } = await DatePickerAndroid.open({
//                     date: new Date(), // Set initial date to current date
//                 });

//                 if (action !== DatePickerAndroid.dismissedAction) {
//                     // Date was selected, set it in the state
//                     setDate(`${year}-${month + 1}-${day}`);
//                 }
//             } catch (error) {
//                 console.warn('DatePickerAndroid error', error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Create Event</Text>

//             {/* Event Title */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Event Title"
//                 onChangeText={setTitle}
//                 value={title}
//             />
//             {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

//             {/* Event Description */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Event Description"
//                 multiline
//                 numberOfLines={4}
//                 onChangeText={setDescription}
//                 value={description}
//             />
//             {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

//             {/* Event Date */}
//             <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
//                 <Text style={styles.datePickerText}>{date ? date : 'Select Event Date'}</Text>
//             </TouchableOpacity>
//             {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

//             {/* Event Location */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Event Location"
//                 onChangeText={setLocation}
//                 value={location}
//             />
//             {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

//             {/* Event Category */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Event Category"
//                 onChangeText={setCategory}
//                 value={category}
//             />
//             {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

//             {/* Submit Button */}
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                 <Text style={styles.submitButtonText}>Create Event</Text>
//             </TouchableOpacity>

//             {/* Cancel Button */}
//             <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     input: {
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingLeft: 10,
//         marginBottom: 10,
//     },
//     datePickerButton: {
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     datePickerText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     submitButton: {
//         backgroundColor: '#007bff',
//         paddingVertical: 12,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     cancelButton: {
//         backgroundColor: '#ff6347',
//         paddingVertical: 12,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     cancelButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginBottom: 10,
//     },
// });

// export default CreateEvent;





import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing date picker
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    // Clear previous errors
    setErrors({});
    
    // Custom validation
    const validationErrors = {};

    if (!title) validationErrors.title = 'Event title is required';
    if (!description) validationErrors.description = 'Event description is required';
    if (!date) validationErrors.date = 'Event date is required';
    if (!location) validationErrors.location = 'Event location is required';
    if (!category) validationErrors.category = 'Event category is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // If no errors, handle the event creation
      console.log('Event Created:', { title, description, date, location, category });
      // Navigate back after submitting
      navigation.goBack();
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
  submitButton: {
    backgroundColor: '#007bff',
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
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
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

