import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { auth } from '../src/firebase';
import { Redirect } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUserData, setUserEmail, setUserName, setUserPhoto, setUserUid } from '../src/redux/actions';

export default function AppLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const dispatch = useDispatch();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if (user) {
            console.log(user)
            dispatch(setUserName(user.displayName))
            dispatch(setUserEmail(user.email))
            dispatch(setUserPhoto(user.photoURL))
            dispatch(setUserUid(user.uid))
        }
    }, [user]);

    if (initializing) return null;

    if (!user) {
        return (
            <Redirect href={'signIn'} />
        )
    }



    return (
        <Redirect href={'tabs'} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
