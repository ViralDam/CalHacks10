import { router, Link } from 'expo-router'
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { COLORS } from '../../src/utils/constants';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { getFeed } from '../../getData';
import Carousel from 'react-native-reanimated-carousel';

const logo = require('../../assets/images/logo-white.png');

const Tabs = () => {

    const updateSliderValue = (itemId, newValue) => {
        setFeed(feed.map(item =>
            item.id === itemId ? { ...item, sliderValue: newValue } : item
        ));
    };

    const challenges = ['https://static.wixstatic.com/media/78f01e_4cad7cf5e4df4bb4bac80f005e3f43c7~mv2.jpg/v1/fit/w_1000%2Ch_1000%2Cal_c%2Cq_80,enc_auto/file.jpg', 'https://www.blogilates.com/wp-content/uploads/2018/08/WaterChallenge-1.jpg', 'https://detoxchallenge.weebly.com/uploads/1/7/1/9/17191398/9413750.jpg'];

    const width = Dimensions.get('window').width;
    const [sliderCompleted, setSliderCompleted] = useState(false);

    const handleSliderComplete = (itemId, value) => {
        setTimeout(() => {
            const percentage = Math.round(value * 100);

            setFeed(feed.map(item =>
                item.id === itemId ? { ...item, rating: percentage } : item
            ));
            setSliderCompleted(true);
        }, 1000);
    };

    const [feed, setFeed] = useState(getFeed());

    const renderItem = ({ item }) => {
        if (item.type == 'recipe') {
            return <View style={styles.item}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />
                    <Text style={styles.username}>{`${item.user} shared a secret recipe.`}</Text>

                </View>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Dish:</Text>
                        <Text>{item.dishName}</Text>
                    </View>
                    <Text style={{ textAlign: 'justify', padding: 10 }}>{item.summary}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', marginRight: 10 }}>{`According to Avo, recipe is ${item.userRatings}% healthy`}</Text>
                    </View>
                    <View style={{ width: '100%', height: 50 }}>
                        <View style={styles.buttonContainer}>
                            <Link
                                style={styles.bakeButton2}
                                href={{ pathname: 'tabs/chat', params: { recipename: item.dishName } }}
                            >
                                <Text style={styles.buttonText}>Get Full Recipe</Text>
                                <Text style={styles.avoemoji}>🥑</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        }
        return (
            <View style={styles.item}>
                <View style={styles.userSection}>
                    <View style={styles.userInfo}>
                        <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />
                        <Text style={styles.username}>{item.user}</Text>
                        <View style={styles.buttonContainer}>
                            <Link
                                style={styles.bakeButton}
                                href={{ pathname: 'tabs/chat', params: { caption: item.dishName } }}
                            >
                                <Text style={styles.buttonText}>Ask Avo</Text>
                                <Text style={styles.avoemoji}>🥑</Text>
                            </Link>
                        </View>
                    </View>
                </View>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.sliderContainer}>
                    <Text style={styles.emoji}>🍔</Text>
                    <Slider
                        style={styles.slider}
                        value={item.sliderValue}
                        // onValueChange={(newValue) => updateSliderValue(item.id, newValue)}
                        minimumValue={0}
                        maximumValue={10}
                        onSlidingComplete={(value) => handleSliderComplete(item.id, value)}
                        minimumTrackTintColor={COLORS.PRIMARY}
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={styles.emoji}>🥦</Text>
                    <Text style={styles.percentageText}>
                        {item.userRatings && item.rating && (
                            <>
                                <FontAwesome name="users" size={24} color="black" />
                                <Text style={styles.percentageText}>
                                    {`${item.userRatings}%`}
                                </Text>
                            </>
                        )}
                    </Text>
                </View>
                <Text style={styles.caption}>
                    <Text style={styles.username}>{item.user}</Text>{" "}
                    {item.caption}
                </Text>

            </View>
        )
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ paddingHorizontal: 80 }}>
                <Image source={logo} style={{ width: '100%', aspectRatio: 470 / 141 }} />
            </View>
            <FlatList
                data={feed}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.container}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ padding: 12 }}>
                            <Text style={{ fontSize: 24, marginVertical: 8}}>Monthly Challenges</Text>
                            {/* <FlatList
                                horizontal
                                renderItem={({item, index}) => {
                                    <Text key={index}>Hi</Text>
                                }}
                                data={[1,2,3]}
                            /> */}
                            <Carousel
                                loop
                                width={width - 25}
                                height={width / 2}
                                autoPlay={true}
                                data={challenges}
                                scrollAnimationDuration={5000}
                                // onSnapToItem={(index) => console.log('current index:', index)}
                                renderItem={({ index }) => (
                                    <View
                                        style={{
                                            flex: 1,
                                            // borderWidth: 1,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Image source={{uri: challenges[index]}} style={{ flex: 1 }}/>
                                        {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                            {index}
                                        </Text> */}
                                    </View>
                                )}
                            />
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        right: 10,
    },
    bakeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'green',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        width: 100,
    },
    bakeButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'green',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        width: 150,
        marginTop: 10
    },
    buttonText: {
        color: 'green', // Text color set to green
        marginRight: 5, // Margin to separate text from emoji
    },
    avoemoji: {
        fontSize: 20, // Adjust size as needed
        color: 'green', // Optional, if you want to color the emoji
    },
    safeArea: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: COLORS.PRIMARY,
        padding: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    userSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    username: {
        fontWeight: 'bold',
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    slider: {
        flex: 1, // Slider will expand to fill available space
        marginHorizontal: 5, // Space around the slider
    },
    percentageText: {
        width: '20%', // Reserving 20% width for the percentage text
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emoji: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fefefe'
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 12,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});
