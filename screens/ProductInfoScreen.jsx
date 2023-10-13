import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions
} from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer'
export default function ProductInfoScreen () {
  const route = useRoute();
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  


  const AddtoCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    },60000);
  }

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{
              width: Dimensions.get('window').width,
              height: 400,
              marginTop: 25,
              resizeMode: 'contain'
            }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#C60C30',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <MaterialCommunityIcons
                  name='share-variant'
                  size={24}
                  color='black'
                />
              </View>
            </View>

            {/* HEART ICON! */}
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20
              }}
            >
              <AntDesign name='hearto' size={24} color='black' />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* MAIN! */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          {route.params.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6 }}>
          ${route.params.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderWidth: 1, borderColor: '#D0D0D0' }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text style={{}}>Color:</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {route?.params?.color}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text style={{}}>Size:</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {route?.params?.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderWidth: 1, borderColor: '#D0D0D0' }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', marginVertical: 5 }}>
          Total : {route.params.price}
        </Text>
        <Text style={{ color: '#00CED1' }}>
          FREE delivery tomorrow 2AM.Order after 10 hours
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          alignItems: 'center',
          gap: 5
        }}
      >
        <Ionicons name='location' size={24} color='black' />
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          Deliver to Babu - Bangalore 560934{' '}
        </Text>
      </View>

      <View>
        <Text
          style={{ color: 'green', marginHorizontal: 10, fontWeight: '500' }}
        >
          In Stock
        </Text>
      </View>

      <Pressable
        onPress={() => {
          AddtoCart(route.params.item)
        }}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (<Text>Added to Cart</Text>) : (<Text>Add to Cart</Text>)}
      </Pressable>

      <Pressable style={{
          backgroundColor: '#FFAC1C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  )
}
