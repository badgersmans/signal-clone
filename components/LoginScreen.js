import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Image } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  // const [email, setEmail] = useState('')

  const signIn = () => {
    
  }

  const signUp = () => {

  }

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 bg-white p-10 items-center justify-center`}
        keyboardVerticalOffset={10}
      >
      <StatusBar style='light'/>

      <Image 
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png'
        }}
        style={tw`h-28 w-28 m-2 object-contain rounded-md`}
      />

      <View style={styles.inputContainer}>
        <Input 
          placeholder='Email' 
          autoFocus
          type='email'
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input 
          placeholder='Password' 
          type='password'
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button 
          title='Login'
          containerStyle={styles.button} 
          buttonStyle={{
            backgroundColor: "#3976f0"
          }}
          onPress={signIn}
         />

        <Button 
          title='Register' 
          containerStyle={styles.button} 
          type='outline' 
          onPress={signUp}
          onPressIn={() => navigation.navigate('Register')}
        />
      </View>

      <View style={{ height: 100 }}/>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10,
    alignSelf: 'center'
  },
})


export default LoginScreen