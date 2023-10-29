import { Link, router } from "expo-router";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../src/firebase";
import { useState } from "react";
import { Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { Image } from 'expo-image';
import { COLORS } from "../src/utils/constants";

const logo = require('../assets/images/logo.png');
const cal_logo = require('../assets/images/cal-logo.png');

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useDispatch();

    const handleLoginPress = () => {
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                router.replace('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn(errorCode, errorMessage)
            })
    }

    return (
        <View style={styles.container}>
            <Image style={{ width: '70%', aspectRatio: 470 / 141, marginBottom: 60 }} source={logo} />
            <View style={{ width: '70%', borderWidth: 0.5, borderRadius: 10, }}>
                <TextInput style={styles.input} inputMode='email' onChangeText={setEmail} placeholder="Email" />
                <View style={{ width: '100%', borderWidth: 0.5, borderRadius: 10, }} />
                <TextInput style={styles.input} onChangeText={setPass} placeholder="Password" secureTextEntry />
                <View style={{ width: '100%', borderWidth: 0.5, borderRadius: 10, }} />
                <TouchableOpacity onPress={handleLoginPress} style={{ backgroundColor: `#637d61`, borderBottomStartRadius: 10, borderBottomEndRadius: 10, padding: 10 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500' }}>Log In</Text>
                </TouchableOpacity>
            </View>
            <Link style={{ marginTop: 5, color: 'blue' }} href={'register'}>
                Dont have account?
            </Link>
            <Image style={{ width: '25%', aspectRatio: 640 / 827, marginTop: 60 }} source={cal_logo} />
            <Text>Made with ❤️</Text>
        </View>
    );
}

export default SignInPage;

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
