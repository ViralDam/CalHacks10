import { useState } from "react";
import { StyleSheet, TextInput, Text, Button, ScrollView, View, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from "../src/utils/constants";
import Constants from 'expo-constants';
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../src/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { router } from "expo-router";

const dummyImage = require('../assets/images/blank_profile.png')

const CreateProfilePage = () => {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState(null);
    const [dob, setDob] = useState(new Date());

    const userUid = useSelector((state) => state.user.uid)
    const userEmail = useSelector((state) => state.user.email)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const setDate = (event, date) => {
        setDob(new Date(date))
    };

    const handleSubmit = async() => {
        console.log(name)
        console.log(bio)
        console.log(dob)
        const photoUrl = await uploadImageAsync(image,userUid);
        try {
            await setDoc(doc(db, "users", userUid), {
                name: name,
                dob: dob,
                bio: bio,
                email: userEmail,
                photoUrl: photoUrl
              });
            router.push('/')
        } catch (e) {
            console.log(e);
        }
        
    }

    const uploadImageAsync = async (uri, uid) => {
        const response = await fetch(uri);
        const blob = await response.blob(); // Convert the fetched response into a blob

        const filename = `${uid}.jpg`;
        const folder = "profilepictures";
        const fileRef = ref(storage, `${folder}/${filename}`);

        await uploadBytes(fileRef, blob);

        const downloadURL = await getDownloadURL(fileRef);

        return downloadURL;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>PROFILE</Text>
            <View style={{
                alignItems: "center"
            }}>
                {image ? <Image source={{ uri: image }} style={styles.image} /> : <TouchableOpacity onPress={pickImage}><Image source={dummyImage} style={styles.image} /></TouchableOpacity>}
                <TouchableOpacity onPress={pickImage}><Text style={styles.uploadText}>Upload Image</Text></TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 10, alignItems: 'flex-start' }}>
                <TextInput style={styles.input} placeholder="Enter name.." onChangeText={setName} placeholderTextColor={COLORS.DARK} />
                <TextInput style={styles.inputBox} placeholder="Enter Bio.." onChangeText={setBio} placeholderTextColor={COLORS.DARK} multiline textAlignVertical="top" />
                <View style={{flexDirection:'row', alignItems:'center', width: '100%', color:COLORS.DARK, paddingLeft: 20}}>
                    <Text style={{ fontSize: 16, }}>Date of Birth</Text>
                    <DateTimePicker style={{marginLeft: 20}} value={dob} onChange={setDate} />
                </View>
            </View>
            <View style={{alignContent: 'center', alignItems:'center', marginTop: 50}}>
                <TouchableOpacity style={{ borderWidth: 1, width: 100, textAlign: 'center', padding: 5, borderRadius: 10, borderColor: COLORS.PRIMARY }} onPress={handleSubmit}><Text style={{fontSize: 20, color: COLORS.DARK, textAlign: 'center'}}>Submit</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        // height: 40,
        margin: 12,
        width: '100%',
        // borderWidth: 1,
        fontSize: 16,
        padding: 10,

    },
    inputBox: {
        margin: 12,
        width: '100%',
        fontSize: 16,
        padding: 10,
        minHeight: 100,
        // backgroundColor: '#B69590'
    },
    header: {
        textAlign: "center",
        fontSize: 30,
        color: COLORS.PRIMARY,
        fontFamily: "Helvetica",
        fontWeight: 'bold',
        marginVertical: 40,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        paddingTop: Constants.statusBarHeight,
    },
    uploadText: {
        fontSize: 14,
        marginVertical: 4,
        color: COLORS.DARK
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY
    },
});

export default CreateProfilePage;