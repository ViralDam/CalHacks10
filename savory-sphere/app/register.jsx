import { router, Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { auth } from "../src/firebase";
import { Image } from "expo-image";
import Checkbox from 'expo-checkbox';
import * as Linking from 'expo-linking';

const logo = require('../assets/images/logo.png');
const cal_logo = require('../assets/images/cal-logo.png');

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isChecked, setChecked] = useState(false);

    const handleRegisterPress = () => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.warn("User Created Successfully");
                setEmail("");
                setPassword("");
                router.replace('createProfile')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/weak-password") {
                    console.warn("Weak password");
                } else if (errorCode == "auth/email-already-in-use") {
                    console.warn("Email already used");
                }
            });
    }

    return (
        <View style={styles.container}>
            <Image style={{ width: '70%', aspectRatio: 470 / 141, marginBottom: 40 }} source={logo} />
            <View style={{ width: '70%', borderWidth: 0.5, borderRadius: 10, }}>
                <TextInput style={styles.input} inputMode='email' onChangeText={setEmail} placeholder="Email" />
                <View style={{ width: '100%', borderWidth: 0.5, borderRadius: 10, }} />
                <TextInput style={styles.input} onChangeText={setPass} secureTextEntry placeholder="Password" />
                <View style={{ width: '100%', borderWidth: 0.5, borderRadius: 10, }} />
                <TextInput style={styles.input} secureTextEntry placeholder="Confirm Password" />
                <View style={{ width: '100%', borderWidth: 0.5, borderRadius: 10, }} />
                <TouchableOpacity onPress={handleRegisterPress} style={{ backgroundColor: `#637d61`, borderBottomStartRadius: 10, borderBottomEndRadius: 10, padding: 10 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500' }}>Register</Text>
                </TouchableOpacity>
            </View>
            <Text style={{marginTop: 5, color: 'blue', textDecorationStyle: 'solid', textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://docs.google.com/document/d/1Y9clzTOKDakoxKPRweUQsJNw1kTOyEg0jmvbmqQZD7o/edit')}> Community Guidelines</Text>
            <View style={{ flexDirection: "row", marginTop: 5, alignItems: 'center' }}>
                <Checkbox 
                style={{marginRight: 10}}
                value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined} 
                    /><Text>I understand and accept.</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ marginTop: 5, color: 'blue' }}>
                    Have account?
                </Text>
            </TouchableOpacity>
            <Image style={{ width: '25%', aspectRatio: 640 / 827, marginTop: 40 }} source={cal_logo} />
            <Text>Made with ❤️</Text>
        </View >
    );
}

export default RegisterPage;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width: '100%',
        borderWidth: 0.1,
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#e7f7e3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
