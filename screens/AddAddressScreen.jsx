import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserType } from '../userContext'

export default function AddAddressScreen ({}) {
  const navigation = useNavigation()

  const [addresses, setAddresses] = useState([])

  const { userId } = useContext(UserType)

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.101.141:8080/api/address/${userId}`
      )
      const { addresses } = response.data

      setAddresses(addresses)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchAddresses()
  }, [])

  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses()
    }, [])
  )

  console.log('addresses', addresses)

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 50 }}
      >
        <View
          style={{
            backgroundColor: '#00CED1',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: 'white',
              borderRadius: 3,
              height: 38,
              flex: 1
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name='search1'
              size={22}
              color='black'
            />
            <TextInput placeholder='Search Amazon.in' />
          </Pressable>
          <View>
            <Feather name='mic' size={24} color='black' />
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Your Addresses
          </Text>

          <Pressable
            onPress={() => {
              navigation.navigate('Address')
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5
            }}
          >
            <Text>Add a new Address</Text>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Pressable>

          <Pressable>{/* all the addresses we stored! */}</Pressable>
        </View>
      </ScrollView>
    </>
  )
}
