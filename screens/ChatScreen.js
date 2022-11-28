import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import tw from 'twrnc'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'

const ChatScreen = () => {

    
    const navigation = useNavigation();
    const route = useRoute();

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
            )
        })
    }, [])

  return (
    <View>
      <Text>{ route.params.chatName }</Text>
    </View>
  )
}

export default ChatScreen