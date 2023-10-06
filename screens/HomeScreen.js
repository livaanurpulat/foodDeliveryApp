import { View, TextInput, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/featuredRow";
import { useState, useEffect } from "react";
import { getFeaturedRestaurants } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  /**
   featuredCategories adlı state ve işlevini oluşturuyoruz.
   öncelikle boş bir dizi olarak başlatıyoruz.
   */
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const navigation = useNavigation();

  /**
   useLayoutEffect Hook'u ekranın görünümünü güncellemek için kullanılır.
   */
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  /**
   useEffect Hook'u bileşen yüklendiğinde veya güncellendiğinde çalışacak fonks.tanımlamak için kullanırız.
   getFeaturedRestaurants() fonksiyonunu çağırarak öne çıkan restoranları alır 
   ve bunları setFeaturedCategories işlemini kullanarak featuredCategories durumu içine yerleştirir. 
   Bu, öne çıkan restoranların verilerini bileşene yükler.
   */
  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      setFeaturedCategories(data);
    })
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 mt-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            height="20"
            width="20"
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Categories />

        <View className="mt-5">
        {/* featuredCategories dizisini haritalayarak her bir öne çıkan kategoriyi FeaturedRow bileşeni içinde görüntüleriz. 
        Her kategori için bir FeaturedRow bileşeni oluşturulur 
        ve bu bileşenlere başlık (title), açıklama (description) ve restoranlar (restaurants) prop'ları iletilir. 
        Bu, öne çıkan kategorileri ve bu kategorilerin altındaki restoranları listelemek için kullanılır. */}
          {featuredCategories.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
