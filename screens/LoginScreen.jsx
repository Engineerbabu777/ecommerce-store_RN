import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const handleAuthState = async () => {
      try {
        // GET TOKEN FROM STORAGE!
        const token = await AsyncStorage.getItem('@tokenAmazon')
        // IF TOKEN NOT FOUND STAY ON LOGIN PAGE!
        if (!token) {
          return
        }
        if (token) {
          navigation.navigate('Main')
        }
        // GET USER DATA!
        // const response = axios.get('/api/user?userId=')
        // TOKEN FOUND REDIRECT TO HOME SCREEN!
      } catch (error) {
        console.log('ERROR-> ', error.message)
      }
    }
    handleAuthState()
  }, [])

  // HANDLE LOGIN!
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.2.166:8080/api/user/login',
        { email, password }
      )

      // SUCCESS!
      if (response?.data?.success) {
        // STORE THE TOKEN IN LOCAL STORAGE!
        AsyncStorage.setItem('@tokenAmazon', response?.data?.token)

        // REDIRECT TO HOME SCREEN!
        navigation.replace('Main')
      }

      if (response?.data?.error) {
        Alert.alert(response?.data?.message)
      }
    } catch (error) {
      console.log('Some kind of error while login: ', error)
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}
    >
      <View>
        <Image
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png'
          }}
          style={{ width: 150, height: 100 }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42'
            }}
          >
            Login to your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
              backgroundColor: '#D0D0D0'
            }}
          >
            <MaterialIcons
              name='email'
              size={24}
              color='gray'
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder='Enter your email'
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
              backgroundColor: '#D0D0D0'
            }}
          >
            <AntDesign
              name='lock'
              size={24}
              color='gray'
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder='Enter your password'
              style={{ color: 'gray', marginVertical: 10, width: 300 }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ fontWeight: '600', color: '#007FFF' }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 70 }} />

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              backgroundColor: '#FEBE10',
              borderRadius: 6
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Log in
            </Text>
          </Pressable>

          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate('register')}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
