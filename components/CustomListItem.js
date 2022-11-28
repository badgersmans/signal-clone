import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { ListItem, Avatar } from '@rneui/themed'

const CustomListItem = ({ id, chatName, enterChat }) => {

  return (
    <ListItem 
        key={id} 
        bottomDivider
        onPress={() => enterChat(id, chatName)}
     >
      <Avatar 
        source={{
            uri: 'https://via.placeholder.com/150'
        }}
        rounded
      />

      <ListItem.Content>
        <ListItem.Title style={tw`font-extrabold`}>
            <Text>{chatName}</Text>
        </ListItem.Title>
    
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            <Text>kkk</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})