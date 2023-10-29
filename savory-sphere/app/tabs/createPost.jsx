import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator, Switch } from "react-native";
import Constants from "expo-constants"
import { COLORS } from "../../src/utils/constants";
import { useState } from "react";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../src/firebase";
import { router } from "expo-router";

const dummyImage = require('../../assets/images/blank-post.png');

const CreatePostPage = () => {
    const [image, setImage] = useState(null);
    const [dishName, setDishName] = useState('');
    const [caption, setCaption] = useState('');
    const [isRecipe, setIsRecipe] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const userUid = useSelector((state) => state.user.uid);
    const userName = useSelector((state) => state.user.displayName);
    const userImageUrl = useSelector((state) => state.user.photoUrl)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleShare = async () => {
        setSubmitted(true);
        const postId = `${userUid}${Date.now()}`;
        try {

            const photoUrl = await uploadImageAsync(image, postId);
            await setDoc(doc(db, "feed", postId), {
                caption: caption,
                dishName: dishName,
                imageUrl: photoUrl,
                user: {
                    name: userName,
                    photoUrl: userImageUrl
                }
            });
            setImage(null);
            setDishName('');
            setCaption('');
            setSubmitted(false);
            router.push('tabs')
        } catch (e) {
            console.log(e);
        }
    }

    const uploadImageAsync = async (uri, imageId) => {
        const response = await fetch(uri);
        const blob = await response.blob(); // Convert the fetched response into a blob

        const filename = `${imageId}.jpg`;

        const folder = "feedpictures";
        const fileRef = ref(storage, `${folder}/${filename}`);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);

        return downloadURL;
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <View style={styles.header}>
                <Text style={{ paddingHorizontal: 24, fontSize: 28, color: 'white', fontWeight: 'bold' }}>Post</Text>
                <View style={{ height: 10 }} />
                <Text style={{ paddingHorizontal: 24, fontSize: 14, color: 'white', fontWeight: 'bold' }}>Share and motivate your friends to eat healthy.</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginTop: 10 }}>
                    <Switch value={isRecipe} onChange={() => setIsRecipe(!isRecipe)} trackColor={{ false: '#fff', true: '#fff' }} thumbColor={isRecipe ? COLORS.PRIMARY : '#fff'}></Switch>
                    <Text style={{ paddingHorizontal: 10, fontSize: 14, color: 'white', fontWeight: 'bold' }}>Sharing Recipe? </Text>
                </View>
            </View>
            {/* <Text style={styles.header}>
                POST
            </Text> */}
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}>
                {!isRecipe ? (
                    <>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{
                                alignItems: "center"
                            }}>
                                {image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={dummyImage} style={styles.image} />}
                                <Text style={styles.uploadText}>Upload Image</Text>
                            </View>
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder="Dish Name.." value={dishName} onChangeText={setDishName} placeholderTextColor={`${COLORS.DARK}cc`} />
                        <TextInput style={styles.inputCaption} placeholder="Caption (optional).." value={caption} onChangeText={setCaption} placeholderTextColor={`${COLORS.DARK}cc`} multiline textAlignVertical="top" />
                    </>
                ) : (
                    <>
                        <TextInput style={styles.input} placeholder="Dish Name.." value={dishName} onChangeText={setDishName} placeholderTextColor={`${COLORS.DARK}cc`} />
                        <TextInput style={styles.inputCaption} placeholder="Ingredients.." value={caption} onChangeText={setCaption} placeholderTextColor={`${COLORS.DARK}cc`} multiline textAlignVertical="top" />
                        <TextInput style={styles.inputRecipe} placeholder="Step-by-step process.." value={caption} onChangeText={setCaption} placeholderTextColor={`${COLORS.DARK}cc`} multiline textAlignVertical="top" />
                    </>
                )}

                {submitted ? (
                    <Text style={styles.buttonText}>
                        Sharing...
                    </Text>
                ) : (
                    <Text style={styles.buttonText} onPress={handleShare}>
                        Share
                    </Text>
                )}
            </ScrollView>
        </KeyboardAvoidingView >
    );
}

export default CreatePostPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        // paddingHorizontal: 20
    },
    header: {
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: COLORS.PRIMARY,
        paddingBottom: 20,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    image: {
        width: `100%`,
        borderRadius: 5,
        borderWidth: 1,
        aspectRatio: 4 / 3,
        borderColor: COLORS.PRIMARY
    },
    uploadText: {
        fontSize: 14,
        marginVertical: 4,
        color: COLORS.DARK
    },
    input: {
        margin: 12,
        width: '100%',
        fontSize: 24,
        paddingVertical: 10,

    },
    inputCaption: {
        marginHorizontal: 12,
        width: '100%',
        fontSize: 16,
        paddingVertical: 10,
        minHeight: 100,
    },
    inputRecipe: {
        marginHorizontal: 12,
        width: '100%',
        fontSize: 16,
        paddingVertical: 10,
        minHeight: 200,
    },
    buttonText: {
        fontSize: 20,
        marginLeft: 15,
        color: COLORS.DARK
    }
});