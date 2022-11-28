import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import { Avatar } from '@rneui/themed'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

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
      ),
      headerRight: () => (
        <View style={tw`flex-row justify-between mr-6 w-16`}>
          <TouchableOpacity
            activeOpacity={0.5}
          >
            <AntDesign name='camerao'
              size={24}
              color='black'
            />
            
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name='pencil'
              size={24}
              color='black'
            />

          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen