import { View, Text, Image} from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

export default function OrderPreparingScreen() {
  const navigation = useNavigation();
  //buradaki görseli sadece 3sn görüntüleyeceğiz bundan sonra sipariş özet sayfasına yönlendirecek.
  //bunun için useEffect ile işlem yapacağız.
  useEffect(()=>{
    setTimeout(()=>{
      //sipariş özet ekranına grçirir
      navigation.navigate('Delivery');
    },3000)
  },[])

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image source={require('../assets/images/delivery.gif')} className="h-80 w-80"/>
    </View>
  )
}