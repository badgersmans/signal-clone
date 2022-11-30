import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    SafeAreaView, 
    Platform, 
    KeyboardAvoidingView, 
    Keyboard,
    ScrollView, 
    StyleSheet, 
    TouchableWithoutFeedback } from 'react-native'

import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import tw from 'twrnc'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';

const ChatScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        }).then(setInput(''))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={tw`flex-row items-center`}>
                    <Avatar 
                        rounded
                        source={{
                            uri: 'https://via.placeholder.com/150'
                        }}
                    />
                    <Text style={tw`text-white ml-2 font-bold`}>{ route.params.chatName }</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={tw`ml-4`}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign 
                        name='arrowleft'
                        size={24}
                        color='white'
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={tw`flex-row mr-5`}>
                    <TouchableOpacity
                        style={tw`ml-4`}
                        // onPress={() => navigation.goBack()}
                    >
                        <FontAwesome 
                            name='video-camera' 
                            size={24} 
                            color='white' 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`ml-4`}
                        // onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name='call' 
                            size={24} 
                            color='white' 
                        />
                    </TouchableOpacity>

                </View>
                    
            )
        })
    }, [])

    useLayoutEffect(() => db
    .collection('chats')
    .doc(route.params.id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
    )), [route])

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
        <StatusBar style='light'/>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1 bg-white`}
            keyboardVerticalOffset={100}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView>
                        { 
                            messages.map(({id, data}) => (
                                data.email === auth.currentUser.email
                                ? (
                                    <View key={id} style={styles.senderContainer}>
                                        <Avatar 
                                           style={tw`bg-red-500`} 
                                        />

                                        <Text
                                            style={styles.senderText}
                                        >
                                            {data.message}
                                        </Text>
                                    </View>
                                )
                                : (
                                    <View key={id} style={styles.receiverContainer}>
                                        <Avatar 
                                            
                                        />

                                    <Text
                                        style={styles.receiverText}
                                    >
                                        {data.message}
                                    </Text>
                                </View>
                                )
                            )) 
                        }
                    </ScrollView>

                    {/* This is the footer */}
                    <View style={tw`flex-row items-center ml-1`}>
                        <TextInput 
                            placeholder='Send a Signal Message'
                            style={styles.input}
                            value={input}
                            onChangeText={text => setInput(text)}
                            onSubmitEditing={sendMessage}
                        />

                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={sendMessage}
                            style={{ marginRight: 10 }}
                        >
                            <Ionicons 
                                name='send'
                                size={24}
                                color='#3976f0'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 15 }}/>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    input: {
        bottom: 0,
        flex: 1,
        height: 40,
        marginRight: 15,
        marginLeft: 15,

        backgroundColor: '#ECECEC',
        padding: 10,
        // color: 'grey',
        borderRadius: 30,
    },
    senderContainer: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        marginTop: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    receiverContainer: {
        padding: 15,
        backgroundColor: '#3976f0',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    },
})

export default ChatScreen