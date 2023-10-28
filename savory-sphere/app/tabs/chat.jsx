import { StyleSheet, View, Text } from "react-native";

const ChatPage = () => {
    return (
        <View style={styles.container}>
            <Text>
                Chat
            </Text>
        </View>
    );
}

export default ChatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});