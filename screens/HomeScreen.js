import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import { Avatar } from '@rneui/themed'
import { auth, db } from '../firebase'

const HomeScreen = () => {

  const signOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace('Login')
    })
  }

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={tw`ml-3`}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={signOut}
          >
            <Avatar 
              rounded
              source={{
                uri: auth?.currentUser?.photoURL
              }}
            />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen