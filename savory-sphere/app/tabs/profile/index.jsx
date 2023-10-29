import { router } from 'expo-router'
import { signOut } from "firebase/auth";
import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from "react-native";
import { auth } from "../../../src/firebase";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { COLORS } from '../../../src/utils/constants';
import Constants from 'expo-constants';
import PostCard from '../../components/PostCard'

const dummyImage = require('../../../assets/images/blank_profile.png');

const Profile = () => {
    const user = useSelector((state) => state.user);
    const {photoUrl, displayName, bio, foodies } = user
    const foodieCount = foodies.length;
    // const profilePic = useSelector((state) => state.user.photoUrl);
    // const userName = useSelector((state) => state.user.displayName);
    // const bio = useSelector((state) => state.user.bio);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.replace('/');
        })
    }

    const post = useSelector((state) => state.pFeed);
    // const [post, setPost] = useState([
    //     {
    //         id: '1',
    //         imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg',
    //         caption: 'Love this healthy salad! #HealthyEating',
    //         ratings: 80,
    //       },
    //       {
    //         id: '2',
    //         imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/03/How-to-Boil-Eggs-main-1-2.jpg',
    //         caption: 'Ande ande ande!',
    //         ratings: 95,
    //       },
    //       {
    //         id: '3',
    //         imageUrl: 'https://images.freeimages.com/images/large-previews/ab2/burger-and-fries-1328407.jpg',
    //         caption: 'Burger',
    //         ratings: 25,
    //       },
    // ]);

    const renderPost = ({ item, index }) => {
        return <PostCard key={index} post={item} />;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: photoUrl }} style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: COLORS.PRIMARY }} placeholder={dummyImage} />
                <Text style={styles.nameText}>{displayName}</Text>
                <Text style={styles.bioText}>{bio}</Text>
                <View style={{flexDirection:'row', marginVertical: 24}}>
                    <TouchableOpacity onPress={() => router.push('tabs/profile/foodies')}>
                        <Text style={styles.statsNum}>{foodieCount}</Text>
                        <Text >Foodies</Text>
                    </TouchableOpacity>
                    <View style={{width: 16}}></View>
                    <View>
                        <Text style={styles.statsNum}>5</Text>
                        <Text>Commuities</Text>
                    </View>
                    <View style={{width: 16}}></View>
                    <View>
                        <Text style={styles.statsNum}>80%</Text>
                        <Text>Progress</Text>
                    </View>
                </View>
            </View>
            <FlatList
                    data={post}
                    renderItem={renderPost}
                    // keyExtractor={item => item.id}
                    style={styles.flatList}
            />
            <Button title="LogOut" onPress={handleSignOut} />
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    nameText: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 20,
    },
    header: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 30,
    },
    bioText: {
        width: '70%',
        textAlign: 'center',
        marginTop: 10,
    },
    statsNum: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    statsTitle: {

    }
});
