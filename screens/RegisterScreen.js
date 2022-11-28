import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Button, Input, Text } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageURL, setImageURL] = useState('')

    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageURL || 'https://via.placeholder.com/150'
            })
            // alert('success')
        }).catch(error => alert(error.message))
    }

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={10}
      >
      <StatusBar style='light'/>

      <Text h3 style={{ marginBottom: 50 }}>Create a Signal account</Text>

      <View style={styles.inputContainer}>

        <Input 
            placeholder='Full Name' 
            autoFocus
            type='text'
            value={name}
            onChangeText={text => setName(text)}
        />

        <Input 
            placeholder='Email' 
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

        <Input 
            placeholder='Profile Picture URL (optional)' 
            type='text'
            value={imageURL}
            onChangeText={text => setImageURL(text)}
            onSubmitEditing={signUp}
        />

        <Button 
            title='Register'
            onPress={signUp}
            buttonStyle={{
                backgroundColor: "#3976f0"
            }}
            containerStyle={styles.button}
            raised
        />

        <View style={{ height: 100 }}/>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: 300
    },
    button: {
        marginTop: 10,
        width: 200,
        alignSelf: 'center'
    },
})

export default RegisterScreen