import { Link, router } from "expo-router";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { auth } from "../src/firebase";
import { useState } from "react";
import { Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';

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
            <Text>Hello</Text>
            <TextInput style={styles.input} inputMode='email' onChangeText={setEmail} />
            <TextInput style={styles.input} onChangeText={setPass} secureTextEntry />
            <Button onPress={handleLoginPress} title="LogIn" />
            <Link href={'register'}>
                Dont have account?
            </Link>
        </View>
    );
}

export default SignInPage;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width: '50%',
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
