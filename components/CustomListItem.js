import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { ListItem, Avatar } from '@rneui/themed'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => db
    .collection('chats')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setChatMessages(snapshot.docs.map(doc => doc.data()))
    })
  , [])

  return (
    <ListItem 
        key={id} 
        bottomDivider
        onPress={() => enterChat(id, chatName)}
     >
      <Avatar 
        source={{
            uri:  chatMessages?.[0]?.photoURL || 'https://via.placeholder.com/150'
        }}
        rounded
      />

      <ListItem.Content>
        <ListItem.Title style={tw`font-extrabold`}>
            <Text>{chatName}</Text>
        </ListItem.Title>
    
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            <Text>{ chatMessages?.[0]?.displayName }: { chatMessages?.[0]?.message }</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})