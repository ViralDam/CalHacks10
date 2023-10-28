import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { auth, db } from '../src/firebase';
import { Redirect, router} from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUserEmail, setUserName, setUserPhoto, setUserUid } from '../src/redux/actions';
import { doc, getDoc } from "firebase/firestore";

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
            const docRef = doc(db, "users", user.uid);
            async function getData() {
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    router.replace('tabs');
                } else {
                    // docSnap.data() will be undefined in this case
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



//     return (
//         <Redirect href={'tabs'} />
//     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
