import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from 'react-redux'

const Tabs = () => {
    const user = useSelector((state) => state.user)
    console.log(user)

    return (
        <View style={styles.container}>
            <Text>
                Tabs
            </Text>
        </View>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
