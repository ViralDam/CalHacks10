import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress'
import { COLORS } from '../../src/utils/constants';

const PostCard = ({ post }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      <Text style={styles.caption}>{post.caption}</Text>
      <View style={styles.progressBarContainer}>
        <Text style={styles.rating}>Rating</Text>
        <Progress.Bar 
          progress={post.ratings / 100} 
          width={200}
          color={COLORS.PRIMARY}
        />
        <Text style={styles.ratingText}>{`${post.ratings}%`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    card: {
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
    postImage: {
      width: '100%',
      height: 200,
      borderRadius: 10,
    },
    rating: {
        fontWeight: 'bold',
        marginRight:10,
    },
    caption: {
      marginTop: 10,
    },
    progressBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    ratingText: {
      marginLeft: 10,
    },
  });

export default PostCard;
