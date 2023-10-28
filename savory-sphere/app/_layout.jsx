import { Stack } from 'expo-router';
import { Provider } from "react-redux";
import store from '../src/redux/store';

const AppLayout = () => {
    return (
        <Provider store={store}>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="signIn"
                />
                <Stack.Screen
                    name="register"
                />
            </Stack>
         </Provider>
    );
}

export default AppLayout;
