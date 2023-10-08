import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput
} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen () {
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

        <View style={{flexDirection:'row',alignItems:'center',gap:5,padding:10,backgroundColor:'#AFEEEE'}}>
          <Ionicons name='location-outline' size={24} color='black' />
          <Pressable>
            <Text style={{fontSize:13,fontWeight:'500'}}>Deliver to Babu - Istanbul Marelyi</Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
