import React, { useState } from 'react'
import axios from 'axios';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../contexts/AuthContext';
// import DateTimePicker from '@react-native-community/datetimepicker';

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export default function Register() {
    const {setIsLoading} = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = async() => {

        let getName = name.trim()
        let getEmail = email.trim()

        if(getName === '' || getEmail === '' || password === '') return Alert.alert("All fields must required")
        if(getName.length < 3) return Alert.alert("Invalid Name")
        if(password.length < 6) return Alert.alert("Password must be greater than 6 chars")
        if (!reg.test(getEmail)) return Alert.alert('Email is Invalid')

        let user = {
            name: getName,
            email: getEmail,
            password: password
        }
        console.log("user", user)
        
        try {
            setIsLoading(true)
            const {data } = await axios.post('http://172.16.50.26:8000/users/register',user)
            console.log("object")
            console.log("data",data.data)
            
        } catch (error) {
            console.error("error",error.response.data.message)
        }
        setIsLoading(false);
       setName('')
       setEmail('')
       setPassword('')
    };
    return (
        <>
            <View style={styles.flexContainer}>
                <View style={styles.card}>
                    <View style={{ marginBottom: 40, textAlign: '' }}>
                        <Text style={styles.text}>Let's Get</Text>
                        <Text style={styles.text}>Started </Text>
                    </View>
                    {/* Name Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        keyboardType="ascii-capable"
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    {/* Custom Button using TouchableOpacity */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontSize: 30,
        fontWeight: 600,
        fontFamily: "Roboto"

    },
    card: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 15,

    },
    input: {
        height: 45,
        width: 290,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 10,
        paddingLeft: 15,
        fontSize: 16
    },
    button: {
        marginTop: 10,
        backgroundColor: '#14213d',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    text1: {
        fontSize: 20,
        marginBottom: 20,
    },
    input1: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        paddingLeft: 10,
        borderRadius: 5,
    },
})


