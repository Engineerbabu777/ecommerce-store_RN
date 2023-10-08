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
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

export default function RegisterScreen () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation()

  const handleRegistration = async () => {
    console.log('DATA SENDING-> ',{email,name,password});
    try {
      const response = await axios.post(
        "http://192.168.2.166:8080/api/user/register",
        { email, name, password }
      )

      console.log('RESPONSE-> ',response.data)

      if (response.data.success) {
        Alert.alert('Registration Successful')
      }

      if (response.data.error) {
        Alert.alert('Registration Failed, try again later')
      }
    } catch (err) {
      Alert.alert('Registration Failed! try again later');
      console.log('ERROR WHILE CREATING NEW USER', err.message);
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
            Register to your Account
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
            <Ionicons
              name='ios-person'
              size={24}
              color='gray'
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder='Enter your name'
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16
              }}
            />
          </View>

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

        <View style={{ marginTop: 0 }}>
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
              secureTextEntry={true}
              placeholder='Enter your password'
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16
              }}
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
            onPress={handleRegistration}
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
            onPress={() => navigation.goBack()}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
