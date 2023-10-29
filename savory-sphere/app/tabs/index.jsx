import { router } from 'expo-router'
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList, SafeAreaView,TouchableOpacity } from "react-native";
import { COLORS } from '../../src/utils/constants';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';

const Tabs = () => {

    const handlePress = () => {

    };
    const updateSliderValue = (itemId, newValue) => {
        setFeed(feed.map(item =>
          item.id === itemId ? { ...item, sliderValue: newValue } : item
        ));
    };
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

    const [feed, setFeed] = useState([
        {
          id: '1',
          user: 'Akaash',
          caption: 'Love eating mushroom pasta!',
          profileImageUrl: 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/361184507_1472203700196554_242700070845021744_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=198BMLIvedcAX_1D7nc&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAUAC9vy5C4DYsNAJB9jX1iLdCbASNAxt5_8cpaeJLfjA&oe=65421F20&_nc_sid=8b3546',
          imageUrl: 'https://assets.bonappetit.com/photos/5d4ddd602c815a00080f9771/1:1/w_2240,c_limit/BA-0919-Creamy-Pasta-Crispy-Mushroom-Playbook.jpg',
          sliderValue: 0,
          userRatings: 72
        },
        {
            id: '2',
            user: 'Mr Robot',
            caption: 'Pizza',
            profileImageUrl:"https://www.nme.com/wp-content/uploads/2017/06/mrrobot_s2_cast_rami-malek2-1392x783.jpg",
            imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2015/03/basic-italian-pizza-margherita.jpg',
            sliderValue: 0,
            userRatings: 40
        },
        {
            id: '3',
            user: 'Mr Robot',
            caption: 'I <3 Eggs',
            profileImageUrl:"https://www.nme.com/wp-content/uploads/2017/06/mrrobot_s2_cast_rami-malek2-1392x783.jpg",
            imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/03/How-to-Boil-Eggs-main-1-2.jpg',
            sliderValue: 0,
            userRatings: 80
        }
    ]);
    
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.userSection}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />
                    <Text style={styles.username}>{item.user}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.bakeButton} 
                            onPress={handlePress}
                        >
                            <Text style={styles.buttonText}>Ask Avo</Text>
                            <Text style={styles.avoemoji}>🥑</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.sliderContainer}>
                    <Text style={styles.emoji}>🍔</Text>
                    <Slider
                        style={styles.slider}
                        value={item.sliderValue}
                        onValueChange={(newValue) => updateSliderValue(item.id, newValue)}
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
    );

    return (
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
