import { Tabs } from "expo-router/tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../../src/utils/constants";

const TabLayout = () => {

    const getIconName = (routeName, isFocused) => {
        switch (routeName) {
            case 'index':
                return isFocused
                    ? 'ios-home'
                    : 'ios-home-outline';
            case 'createPost':
                return isFocused
                    ? 'ios-add-circle'
                    : 'ios-add-circle-outline';
            case 'chat':
                return isFocused
                    ? 'ios-chatbox'
                    : 'ios-chatbox-outline';
            case 'profile':
                return isFocused
                    ? 'ios-person'
                    : 'ios-person-outline';
        }
        return 'alert-circle';
    }

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const { name } = route;
                    return <Ionicons name={getIconName(name, focused)} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.BACKGROUND,
                tabBarInactiveTintColor: COLORS.BACKGROUND,
                tabBarStyle: {
                    backgroundColor: COLORS.PRIMARY,
                },
            })}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Explore"
                }}
            />
            <Tabs.Screen
                name='createPost'
                options={{
                    title: "Post"
                }}
            />
            <Tabs.Screen
                name='chat'
                options={{
                    title: "AI Expert"
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile"
                }}
            />
        </Tabs>
    );
}

export default TabLayout;