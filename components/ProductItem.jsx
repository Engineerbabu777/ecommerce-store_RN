import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer'

export default function ProductItem ({ image, title, rating, price, item }) {
  const dispatch = useDispatch()
  const [addedToCart, setAddedToCart] = useState(false)

  const addItemToCart = item => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 60000)
  }

  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: 'contain' }}
        source={{ uri: image }}
      />
      <Text style={{ marginTop: 10, width: 150 }} numberOfLines={1}>
        {title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>${price}</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFC72C' }}>
          {rating?.rate}
        </Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10
        }}
      >
        {addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({})
