import React, { useState } from 'react'
import axios from 'axios';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';

export default function Login({ navigation }) {
    const {dispatch} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async() => {
        let getEmail = email.trim()
        let getPassword = password

        console.log("email",getEmail)
        console.log("password", getPassword)

        if (getEmail === '' || getPassword === '') return Alert.alert("All fields must required")
        if (getPassword.length < 6) return Alert.alert("Password must be greater than 6 chars")

        let currentUser = {
            email: getEmail,
            password: getPassword
        }

        console.log("user", currentUser)
        try{
            
            const {data} = await axios.post('http://172.16.50.26:8000/users/login', currentUser )
            console.log("data", data)
            const {token} = data.data
            const {user} = data.data
            axios.defaults.headers.common['Authorization'] = token;
            await AsyncStorage.setItem("token", token)
            dispatch({type: "SET_USER", payload: user})
            
        }catch(error){
            console.log("err",error)
            console.log("error", error.response.data.message)
        }
        setEmail('')
        setPassword('')

    };
    return (
        <>
            <View style={styles.flexContainer}>
                <View style={styles.card}>
                    <View style={{ marginBottom: 40, textAlign: '' }}>
                        <Text style={styles.text}>Sign in</Text>
                    </View>
                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    {/* Custom Button using TouchableOpacity */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>SIGN-IN</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <TouchableOpacity style={styles.createButton} onPress={() => { navigation.navigate("Register") }}>
                        <Text style={styles.buttonText}>Create account</Text>
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
        backgroundColor: '#14213d', // Set background color here
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff', // Button text color
        fontSize: 14,
    },
    createButton: {
        marginTop: 10,
        backgroundColor: '#fca311', // Set background color here
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})