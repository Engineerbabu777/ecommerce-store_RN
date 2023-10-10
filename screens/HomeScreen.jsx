import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { deals, images, list, offers } from '../data/constant'
import { SliderBox } from 'react-native-image-slider-box'
import ProductItem from '../components/ProductItem'
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen () {
  const [products, setProducts] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [category, setCategory] = useState('jewelery')
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" }
  ]);

  const navigation = useNavigation()

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(json => setProducts(json))
      } catch (error) {
        console.log('Error Getting Products Data: ', error.message)
      }
    }
    fetchData()
  }, [])
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        flex: 1,
        backgroundColor: '#FFFFFF'
      }}
    >
      <ScrollView>
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            padding: 10,
            backgroundColor: '#AFEEEE'
          }}
        >
          <Ionicons name='location-outline' size={24} color='black' />
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: '600' }}>
              Deliver to Babu - Istanbul Marelyi
            </Text>
          </Pressable>
          <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />
        </View>

        {/* SCROLL ABLE ITEMS! */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((i, ind) => (
            <Pressable
              key={ind}
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                source={{ uri: i.image }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 5
                }}
              >
                {i?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* IMAGE SLIDER! */}
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={'#1327AF'}
          inactiveDotColor={'#90A4AE'}
          ImageComponentStyle={{ width: '100%' }}
        />

        {/* TRENDING DEALS! */}
        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
          Trending deals of the week
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {deals.map((item, ind) => (
            <Pressable
           
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              key={ind}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </Pressable>
          ))}
        </View>
        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15
          }}
        />

        {/* TRENDING OFFERS! */}
        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
          Today's deals
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((offer, ind) => (
            <Pressable
            onPress={() => navigation.navigate('Info',{
              id: offer.id,
              title: offer.title,
              price: offer?.price,
              carouselImages: offer.carouselImages,
              color: offer?.color,
              size: offer?.size,
              oldPrice: offer?.oldPrice,
              item: offer,
            })}
              key={ind}
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={{ uri: offer?.image }}
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
              />

              <View
                style={{
                  padding: 5,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 4,
                  backgroundColor: '#E31837'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold'
                  }}
                >
                  Upto {offer?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15
          }}
        />

        {/* DROP DOWN MENU! */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: '45%',
            marginBottom: isOpen ? 50 : 15
          }}
        >
          <DropDownPicker
            style={{
              borderColor: '#B7B7B7',
              height: 30,
              marginBottom: isOpen ? 120 : 15
            }}
            open={isOpen}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder='choose category'
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        {/* PRODUCTS! */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {products.length > 0 &&
            products
              .filter(item => item.category === category)
              .map((product, ind) => <ProductItem {...product} key={ind} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
