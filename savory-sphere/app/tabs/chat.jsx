import { FlatList, Text, TextInput, TouchableOpacity, View, Keyboard, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import { COLORS } from '../../src/utils/constants';
import { useLocalSearchParams } from 'expo-router';

const backImage = require('../../assets/images/chat-background.jpg');


const _endpoint = `https://api.together.xyz/inference`
const startPrompt = `Context: This is conversation between chat bot that can help users with recipe, healthy food queries. Bot always restricts quries oly related to healthy eating.\n\n`;

const startMsg = `👋 Hi there! I'm Avo, your foodie friend in Eat-O-Pia! 🥑 Ready to cook up some fun? Ask me anything about recipes, healthy eats, or just chat about your favorite flavors! 🍽️`

const ChatPage = () => {
    const [chat_log, setChat_log] = useState([{ 'text': startMsg, 'isUser': false }]);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const { caption } = useLocalSearchParams();


    useEffect(() => {
        if(caption) {
            const newChat = [...chat_log, { 'text': `Give me healthy recipe for ${caption}`, 'isUser': true }]
            setChat_log(newChat);
            getResponse(newChat);
        }
    }, [caption])

    const getPrompt = (chat_log) => {
        let story = '';
        chat_log.forEach(chat => {
            if (chat.isUser) {
                story += 'User: ' + chat.text + '<end>';
            }
            else {
                story += 'Bot: ' + chat.text + '<end>';
            }
        });
        story += 'Bot: '
        return startPrompt + story;
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeAllListeners('');
        };
    }, []);

    const _keyboardDidShow = (event) => setKeyboardOffset(event.endCoordinates.height - 90);
    const _keyboardDidHide = () => setKeyboardOffset(0);

    const flatListRef = useRef();

    const handleSend = () => {
        if (message) {
            const newChat = [...chat_log, { 'text': message, 'isUser': true }]
            setChat_log(newChat);
            Keyboard.dismiss();
            setMessage('');
            getResponse(newChat);
        }
    }

    const getResponse = async (newChat) => {
        setChat_log([...newChat, { 'text': 'Cooking...👩🏻‍🍳', 'isUser': false }]);
        axios.post(_endpoint, {
            "model": "togethercomputer/llama-2-70b-chat",
            "max_tokens": 512,
            "prompt": getPrompt(newChat),
            "request_type": "language-model-inference",
            "temperature": 0.7,
            "top_p": 0.7,
            "top_k": 50,
            "repetition_penalty": 1,
            "type": "language",
            "stop": "<end>"
        }, {
            headers: {
                Authorization: `Bearer ${Constants?.expoConfig?.extra?.togetherApiKey}`
            }
        }).then((response) => {
            // console.log(response.data.output.choices[0].text);
            setChat_log([...newChat, { 'text': response.data.output.choices[0].text.trim().slice(0, -5), 'isUser': false }]);
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <ImageBackground source={backImage} resizeMode="cover" style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={styles.container}>
                <View style={{ flex: 1.9 }}>
                    <FlatList
                        data={chat_log}
                        ref={flatListRef}
                        contentContainerStyle={{ flexDirection: 'column-reverse', paddingTop: 16 }}
                        inverted
                        renderItem={({ item, index }) => {
                            rowId = { index }
                            if (item.isUser) {
                                return (
                                    <View style={styles.rightBubble} key={index}>
                                        <Text style={{ fontSize: 16, color: "#fff", }} key={index}> {item.text}</Text>
                                        <View style={styles.rightArrow} />
                                        <View style={styles.rightArrowOverlap} />
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={styles.leftBubble} key={index}>
                                        <Text style={{ fontSize: 16, color: "#000", justifyContent: "center" }} key={index}> {item.text}</Text>
                                        <View style={styles.leftArrow} />
                                        <View style={styles.leftArrowOverlap} />
                                    </View>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{ flex: 0.15 }}>
                    <View style={{ position: 'absolute', bottom: keyboardOffset, flexDirection: 'row', paddingVertical: 12, justifyContent: 'center', alignContent: 'center', marginHorizontal: 10, }} >
                        <TextInput style={styles.inputStyle} value={message} onChangeText={setMessage} onSubmitEditing={Keyboard.dismiss} placeholder='Give me health information regarding ...' placeholderTextColor={`${COLORS.DARK}40`}></TextInput>
                        <TouchableOpacity onPress={() => handleSend()}>
                            <Ionicons name="send" size={24} style={{ marginTop: 4, marginLeft: 8 }} color={COLORS.DARK}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    rightBubble: {
        backgroundColor: "#0078fe",
        padding: 10,
        marginLeft: '25%',
        borderRadius: 5,
        marginTop: 5,
        marginRight: "5%",
        maxWidth: '70%',
        alignSelf: 'flex-end',
        borderRadius: 20,
    },

    rightArrow: {
        position: "absolute",
        backgroundColor: "#0078fe",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },

    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fefefe",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20

    },

    /*Arrow head for recevied messages*/
    leftBubble: {
        backgroundColor: "#dedede",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginLeft: "5%",
        maxWidth: '70%',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },

    leftArrow: {
        position: "absolute",
        backgroundColor: "#dedede",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },

    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fefefe",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20

    },

    inputStyle: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 100,
        fontSize: 16,
        padding: 8,
        backgroundColor: '#fff'
    },

    image: {
        flex: 1,
    },
});

export default ChatPage;