import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('Email:', email);
        console.log('Password:', password);
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
        backgroundColor: '#ac1e5f', // Set background color here
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
        backgroundColor: '#ac1e5f', // Set background color here
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})