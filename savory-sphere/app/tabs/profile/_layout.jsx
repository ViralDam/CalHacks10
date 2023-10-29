import { Stack } from 'expo-router';

const ProfileLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="foodies"
            />
        </Stack>
    );
}

export default ProfileLayout;
