import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { setRestaurant } from "../slices/restaurantSlice";
import { urlFor } from "../sanity";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  /**
   useRoute hook'u, bir ekranın rotasından (route) gelen parametreleri almak için kullanılır. 
   params değişkeni, bu bileşende kullanılmak üzere rota tarafından iletilen parametreleri içerir.
   */
  const { params } = useRoute();
  /**
   Rota parametrelerini item adlı bir değişkene kopyalarız. 
   Bu, restoranın ayrıntılarını ve menüsünü içeren params değişkenini item değişkenine atar.
   */
  let item = params;
  /**
   Redux'ta eylemleri tetiklemek için 'dispatch' işlemini kullanırız.
   Bu işlevi 'useDispatch' hook'u  ile sağlarız.
   */
  const dispatch = useDispatch();
  /**
   useEffect hook'u, bileşen yüklendiğinde veya güncellendiğinde çalışacak işlemleri tanımlamak için kullanılır. 
   Bu durumda, eğer item ve item._id mevcutsa, bu restoranın ayrıntılarını Redux store'a eklemek için setRestaurant eylemini tetikler. 
   Bu, restoranın detaylarını Redux store'a yükler.
   */
  useEffect(() => {
    if (item && item._id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);
  return (
    <View>
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{uri: urlFor(item.image).url()}} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/images/fullStar.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{item.stars}</Text>
                  <Text className="text-gray-700">
                    ({item.reviews} review)•{" "}
                    <Text className="font-semibold">{item?.type?.name}</Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width="15" height="15" />
                <Text className="text-xs">Nearby • {item.address}</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{item.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* item nesnesinin dishes özelliği (yemeklerin listesi) haritalanarak her yemek öğesi için bir DishRow bileşeni oluşturulur. 
          Her yemek öğesi, item nesnesinin dishes özelliği içerisinde bulunur ve key prop'u iletilerek benzersiz bir anahtar atanır. 
          Bu, restoranın menüsünü görüntülemek için kullanılır. */}
          {item.dishes.map((dish, index) => (
            <DishRow item={{ ...dish }} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
