import { router } from 'expo-router'
import { signOut } from "firebase/auth";
import { Text, View, StyleSheet, Button } from "react-native";
import { auth } from "../../src/firebase";

const Profile = () => {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.replace('/');
        })
    }
    return (
        <View style={styles.container}>
            <Text>
                Profile
            </Text>
            <Button title="LogOut" onPress={handleSignOut}/>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
