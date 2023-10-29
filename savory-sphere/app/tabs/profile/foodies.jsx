import { Text, View, StyleSheet } from "react-native";
import Constants from 'expo-constants';

const FoodiesPage = () => {
    return (
        <View style={styles.container}>
            <Text>Foodies</Text>
        </View>
    );
}

export default FoodiesPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});
