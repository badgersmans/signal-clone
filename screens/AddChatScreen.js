import { View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input } from '@rneui/themed'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
import isEmptyOrSpaces from '../lib/isEmptyOrSpaces'

const AddChatScreen = () => {

  const navigation = useNavigation();
  const [input, setInput] = useState('');

  const createChat = async () => {
    await db.collection('chats')
    .add({
      chatName: input
    }).then(() => {
      navigation.goBack();
    }).catch(error => alert(error.message))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats'
    });
  }, [navigation])

  return (
    <View style={tw`h-100 p-5 bg-white`}>
      <Input 
        placeholder='Enter a chat name'
        value={input}
        onChangeText={text => isEmptyOrSpaces(text) ? setInput('') : setInput(text)}
        leftIcon= {
          <Icon 
            name='wechat'
            type='antdesign'
            size={24}
            color='black'
          />
        }
        onSubmitEditing={() =>
          !isEmptyOrSpaces(input) && createChat
        }
      />
        <Button 
          onPress={createChat}
          title='Create new Chat'
          disabled={!input}
        />
    </View>
  )
}

export default AddChatScreen