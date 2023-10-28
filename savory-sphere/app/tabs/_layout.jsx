import { Tabs } from "expo-router/tabs";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}>
            <Tabs.Screen name='feed' />
            <Tabs.Screen name='index' />
            <Tabs.Screen name='profile' />
        </Tabs>
    );
}

export default TabLayout;