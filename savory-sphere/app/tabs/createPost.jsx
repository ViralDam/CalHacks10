import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants"
import { COLORS } from "../../src/utils/constants";

const CreatePostPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                POST
            </Text>

        </View>
    );
}

export default CreatePostPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 40
    },
    header: {
        // textAlign: "center",
        fontSize: 40,
        color: COLORS.PRIMARY,
        fontFamily: "Helvetica",
        fontWeight: 'bold',
        marginVertical: 40,
    },
});