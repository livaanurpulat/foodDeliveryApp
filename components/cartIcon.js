import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../slices/cartSlice";

export default function CartIcon() {
  /**
   useNavigation hook'unu kullanarak navigasyonu etkinleştiririz. 
   Bu, sepet simgesine tıkladığınızda ilgili ekranı açmak için kullanılacaktır.
   */
  const navigation = useNavigation();
  
  /**
   Redux store'dan sepet öğelerini (cartItems) ve sepetin toplam fiyatını (cartTotal) almak için useSelector kullanılır. 
   Bu, Redux store'daki veriyi bu bileşen içinde kullanmanıza olanak tanır.
   Eğer sepet boşsa, bu bileşen hiçbir şey yapmaz ve görüntülenmez. 
   Sepette hiç ürün yoksa, kullanıcıya bir şey göstermek yerine görünmez hale gelir.
   */
  const cartItems = useSelector(selectCartItems);
  const cartTotal= useSelector(selectCartTotal);
  if (!cartItems.length) return;

  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
      //CartScreen ekranına yönlendirir.
        onPress={() => navigation.navigate("Cart")}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 -lg"
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          <Text className="font-extrabold text-white text-lg">
            {cartItems.length}
          </Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          View Cart
        </Text>
        <Text className="font-extrabold text-white text-lg"> ₺{cartTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}
