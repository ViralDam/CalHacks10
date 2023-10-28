import { router } from 'expo-router'
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { COLORS } from '../../src/utils/constants';
import Slider from '@react-native-community/slider';

const Tabs = () => {
    const updateSliderValue = (itemId, newValue) => {
        setFeed(feed.map(item =>
          item.id === itemId ? { ...item, sliderValue: newValue } : item
        ));
    };

    const [feed, setFeed] = useState([
        {
          id: '1',
          user: 'Akaash',
          caption: 'Love eating mushroom pasta!',
          profileImageUrl: 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/361184507_1472203700196554_242700070845021744_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=198BMLIvedcAX_1D7nc&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAUAC9vy5C4DYsNAJB9jX1iLdCbASNAxt5_8cpaeJLfjA&oe=65421F20&_nc_sid=8b3546',
          imageUrl: 'https://assets.bonappetit.com/photos/5d4ddd602c815a00080f9771/1:1/w_2240,c_limit/BA-0919-Creamy-Pasta-Crispy-Mushroom-Playbook.jpg',
          sliderValue: 0,
        },
        {
            id: '2',
            user: 'Mr Robot',
            caption: 'Pizza',
            profileImageUrl:"https://www.nme.com/wp-content/uploads/2017/06/mrrobot_s2_cast_rami-malek2-1392x783.jpg",
            imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2015/03/basic-italian-pizza-margherita.jpg',
            sliderValue: 0,
        },
        {
            id: '3',
            user: 'Mr Robot',
            caption: 'I <3 Eggs',
            profileImageUrl:"https://www.nme.com/wp-content/uploads/2017/06/mrrobot_s2_cast_rami-malek2-1392x783.jpg",
            imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/03/How-to-Boil-Eggs-main-1-2.jpg',
            sliderValue: 0,
        }
    ]);
    
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.userSection}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />
                    <Text style={styles.username}>{item.user}</Text>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor={COLORS.PRIMARY}
                    maximumTrackTintColor="#000000"
                />
            </View>
            <Text style={styles.caption}>{item.caption}</Text>
        </View>
    );

    return (
       /*  <View style={styles.container}>
            <Text>
                Tabs
            </Text>
        </View> */
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Eat-o-pia</Text>
            </View>
            <FlatList
                data={feed}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.container}
            />
        </SafeAreaView>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: COLORS.PRIMARY,
      padding: 15,
      alignItems: 'center',
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
        marginTop: 8,
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
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
      slider: {
        width: 200,
        height: 40,
      },
    container: {
      flex: 1,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      padding: 10,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
    },
    username: {
      fontWeight: 'bold',
      marginTop: 8,
    },
    caption: {
      marginTop: 4,
    },
});
