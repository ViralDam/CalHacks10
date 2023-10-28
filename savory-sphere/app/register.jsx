import { router, Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { auth } from "../src/firebase";

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

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
            <Text>Register</Text>
            <TextInput style={styles.input} inputMode='email' onChangeText={setEmail} />
            <TextInput style={styles.input} onChangeText={setPass} secureTextEntry />
            <Button onPress={handleRegisterPress} title="Register" />
            <TouchableOpacity onPress={() => router.back()}>
                <Text>
                    Have account?
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default RegisterPage;

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
