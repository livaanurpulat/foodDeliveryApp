import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getCategories } from "../api";
import { urlFor } from "../sanity";

export default function Categories() {
  /**
   bir durum değişkeni ve bu değişkeni güncellemek için useState Hook kullanıyoruz.
   activeCategory:durum değişkeni, setActiveCategory:durumu güncelleyen işlev.
   */
  const [activeCategory, setActiveCategory] = useState(null);

  /**
   categories:durum değişkeni, setCategories:durumu güncelleme. 
   başlangıçta 'categories' boş bir dizi olarak tanımladık.
   */
  let [categories, setCategories] = useState([]);

  /**
   SANITY'DE OLUŞTURDUĞUMUZ VERİLERİ ÇEKİYORUZ..
  useEffect Hook: bileşen ilk kez render edildiğinde ve belirtilen bağımlılıklar(burada boş dizi)değiştiğinde çalışacak.
  içindeki fonksyion getCategories adlı bir asenkron işlem başlatır.
  bu işlemi kategorileri bir veri kaynağından almak için kullanılır ve
  işlem tamamlandığında bir veri nesnesi döndürür.
  getCategories işlemi tamamlandığında 'then' bloğu içindeki kod çalışır ve
  dönen veriyi 'setCategories' işlevi aracılığıyla 'categories' durum değişkenine atar.
  bu, alınan kategorileri bileşenin durumu içinde saklar 
  ve bileşeni yeniden render eder*
   */
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {/* categories dizisini haritalar(map) ve her bir kategori ögesini gösterir. */}
        {categories.map((category, index) => {
          /**
           bu satırda her kategori ögesi (category) ve etkin kategori (activeCategory) arasında bir karşılaştırma yapılır.
          Eğer kategori öğesinin _id özelliği etkin kategori ile aynı ise, isActive değişkeni true olarak ayarlanır. 
          Yani, bu satır, şu an etkin kategori olan kategoriyi belirlemek için kullanılır.
           */
          let isActive = category._id == activeCategory;
          /**
           Bu satırda, isActive değişkeninin değerine bağlı olarak bir stil sınıfı atanır. 
          Eğer isActive true ise (yani kategori etkinse), o zaman bg-gray-600 sınıfı atanır; 
          aksi takdirde (kategori etkin değilse) bg-gray-200 sınıfı atanır. 
          Bu, kategori düğmelerinin arka plan rengini belirlemek için kullanılır.
           */
          let btnClass = isActive ? "bg-gray-600" : "bg-gray-200";
          /**
           Bu satırda da isActive değişkeninin değerine bağlı olarak bir stil sınıfı atanır, ancak bu sefer metin (text) stili için kullanılır. 
          Eğer isActive true ise (kategori etkinse), font-semibold (kalın metin) ve text-gray-600 (gri renkli metin) sınıfları atanır; 
          aksi takdirde (kategori etkin değilse) sadece text-gray-500 (daha soluk gri renkli metin) sınıfı atanır. 
          Bu, kategori adının stilini belirlemek için kullanılır.
           */
          let textClass = isActive
            ? "font-semibold text-gray-600"
            : "text-gray-500";
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
              /**
               kategoriye tıklanıldığında setActiveCategory(category._id) işlemini tetikler. 
              Bu işlem, tıklanan kategoriyi etkin kategori olarak işaretlemek için kullanılır. 
              Ayrıca, btnClass değişkeni ile stil sınıfları uygulanır.
               */
                onPress={() => setActiveCategory(category._id)}
                className={"p-1 rounded-full shadow bg-gray-200 " + btnClass}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{ uri: urlFor(category.image).url() }}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
