import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { auth, db } from '../src/firebase';
import { Redirect, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setFoodie, setUserBio, setUserDob, setUserEmail, setUserName, setUserPhoto, setUserUid } from '../src/redux/actions';
import { doc, getDoc, Timestamp } from "firebase/firestore";

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
            const docRef = doc(db, "users", user.uid);
            async function getData() {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const docData = docSnap.data()
                    const timestamp = new Timestamp(docData.dob.seconds, docData.dob.nanoseconds)
                    dispatch(setUserName(docData.name))
                    dispatch(setUserEmail(user.email))
                    dispatch(setUserPhoto(docData.photoUrl))
                    dispatch(setUserBio(docData.bio))
                    dispatch(setUserDob(timestamp.toDate().toString()))
                    dispatch(setUserUid(user.uid))
                    dispatch(setFoodie(docData.foodies))
                    router.replace('tabs');
                } else {
                    console.log("No such document!");
                    router.replace('createProfile');
                }
            }
            getData()
        }
    }, [user]);

    if (initializing) return null;

    if (!user) {
        return (
            <Redirect href={'signIn'} />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
