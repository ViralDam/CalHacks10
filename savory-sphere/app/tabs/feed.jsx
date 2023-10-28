import { router } from 'expo-router'
import { Text, View, StyleSheet, Button } from "react-native";
import { auth } from "../../src/firebase";
//import { StreamApp, FlatFeed, Activity } from 'getstream-expo';


import {
    StreamApp,
    FlatFeed,
    Activity
  } from "expo-activity-feed";
//import { STREAM_API_KEY, STREAM_API_TOKEN, STREAM_APP_ID } from "";

const activities = [
    {
      actor: 'John Doe',
      text: 'This is a sample post from John.',
      attachments: {
        images: ['https://example.com/image1.jpg']
      }
    }
  ];

  const Feed = () => {
    const apiKey = process.env.STREAM_API_KEY;
    const appId = process.env.STREAM_APP_ID;
    const token = process.env.STREAM_API_TOKEN;
    return (
        <View style={styles.container}>
            <StreamApp
                apiKey={apiKey}
                appId={appId}
                token={token}
                >
                <FlatFeed
                    // Activity={(props) => (
                    // <View style={styles.activityContainer}>
                    //     <Text style={styles.actorName}>{props.activity.actor}</Text>
                    //     {props.activity.attachments &&
                    //     props.activity.attachments.images.map((image, idx) => (
                    //         <Image key={idx} source={{ uri: image }} style={styles.image} />
                    //     ))}
                    //     <Text style={styles.activityText}>{props.activity.text}</Text>
                    // </View>
                    // )}
                    // activities={activities}
                />
            </StreamApp>
        </View>
    );
}

export default Feed;

const styles = StyleSheet.create({
    activityContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    actorName: {
      fontWeight: 'bold',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginVertical: 10,
    },
    activityText: {
      fontSize: 16,
    },
  });
  
