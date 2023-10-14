import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert
} from 'react-native'
import { UserType } from '../userContext'
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddressScreen () {
  const [name, setName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [houseNo, setHouseNo] = useState('')
  const [street, setStreet] = useState('')
  const [landmark, setLandmark] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const { userId, setUserId } = useContext(UserType)

  const navigation = useNavigation()

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('@tokenAmazon')
      const decodedToken = jwt_decode(token)
      const userId = decodedToken.userId
      setUserId(userId)
    }

    fetchUser()
  }, [])

  console.log(userId)

  const handleAddAddress = async () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode
    }

    console.log(address)
    axios
      .post('http://192.168.101.141:8080/api/address/newAddress', {
        userId,
        address
      })
      .then(response => {
        console.log(response.data)
        Alert.alert('Success', 'Addresses added successfully')
        setName('')
        setMobileNo('')
        setHouseNo('')
        setStreet('')
        setLandmark('')
        setPostalCode('')

        setTimeout(() => {
          navigation.goBack()
        }, 500)
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to add address')
        console.log('error', error)
      })
  }

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ height: 50, backgroundColor: '#00CED1' }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            Add a new Address
          </Text>

          <TextInput
            style={{
              padding: 10,
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              borderColor: '#D0D0D0'
            }}
            placeholder='Pakistan'
            placeholderTextColor={'black'}
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Full Name (First and Last Name)
            </Text>

            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#D0D0D0'
              }}
              placeholder='Enter your name'
              placeholderTextColor={'black'}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Mobile number
            </Text>

            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#D0D0D0'
              }}
              placeholder='Mobile No'
              placeholderTextColor={'black'}
              value={mobileNo}
              onChangeText={text => setMobileNo(text)}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Flat,House No,Building,Company
            </Text>

            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#D0D0D0'
              }}
              placeholder=''
              placeholderTextColor={'black'}
              value={houseNo}
              onChangeText={text => setHouseNo(text)}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Area,Street,Sector,village
            </Text>

            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#D0D0D0'
              }}
              placeholder=''
              placeholderTextColor={'black'}
              value={street}
              onChangeText={text => setStreet(text)}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Landmark</Text>

            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#D0D0D0'
              }}
              placeholder='Ex near allied hospital'
              placeholderTextColor={'black'}
              value={landmark}
              onChangeText={text => setLandmark(text)}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Pin-Code</Text>

            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#D0D0D0'
              }}
              placeholder='Enter PinCode'
              placeholderTextColor={'black'}
              value={postalCode}
              onChangeText={text => setPostalCode(text)}
            />
          </View>

          <Pressable
            onPress={handleAddAddress}
            style={{
              padding: 19,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFC72C',
              marginTop: 20
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  )
}
