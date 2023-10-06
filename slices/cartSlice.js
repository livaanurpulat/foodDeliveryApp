import { createSlice } from "@reduxjs/toolkit";

/**
Başlangıç durumunu temsil eden bir initialState nesnesi oluşturulur. 
Bu başlangıç durumu, items adlı bir boş dizi içerir. 
Bu, sepetin başlangıç durumunu tanımlar.
 */
const initialState = {
  items: [],
};

/**
 Redux Toolkit'in createSlice fonksiyonu kullanılarak bir Redux slice oluşturulur. 
 name özelliği "cart" olarak ayarlanır ve initialState başlangıç durumu ile birlikte slice tanımlanır. 
 Ayrıca, reducers nesnesi içinde çeşitli eylem yaratıcıları (action creators) tanımlanır.
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
    Bu action creator, sepete bir öğe eklemek için kullanılır. 
    İlgili öğeyi action.payload üzerinden alır ve mevcut sepetin sonuna ekler.
     */
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    /**
    Bu action creator, sepetten bir öğeyi kaldırmak için kullanılır. 
    İlgili öğenin _id özelliği, action.payload.id üzerinden alınır ve bu öğenin sepet içindeki indeksi state.items.findIndex ile bulunur. 
    Eğer öğe sepet içinde bulunursa, bu öğe sepetten çıkarılır (newCart.splice(itemIndex, 1)). 
    Eğer öğe sepet içinde bulunmuyorsa, bir hata mesajı yazdırılır.
     */
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        item => item._id == action.payload.id
      );
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("can't remove the item that is not added to cart!");
      }
      state.items = newCart;
    },
    /**
     Bu action creator, sepetteki tüm öğeleri temizlemek için kullanılır. 
     state.items dizisi tamamen boşaltılır.
     */
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
/**Bu satırda, oluşturulan action creator'lar dışa aktarılır, böylece bunları başka bir yerde kullanabiliriz.*/
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
/**Bu, Redux store'da bulunan sepet öğelerini seçmek için bir selektör (selector) fonksiyonunu dışa aktarır. 
state.cart.items ile sepetin içeriğine erişir.*/
export const selectCartItems = (state) => state.cart.items;
/**Bu selektör fonksiyonu, belirli bir öğe kimliğine sahip öğeleri seçmek için kullanılır. 
state.cart.items dizisini filtreleyerek verilen id'ye sahip öğeleri döndürür.*/
export const selectCartItemsById = (state, id) =>
  state.cart.items.filter((item) => item._id == id);
/**Bu selektör fonksiyonu, sepetteki öğelerin toplam fiyatını hesaplamak için kullanılır. 
state.cart.items dizisini reduce fonksiyonu ile dolaşarak her öğenin fiyatını toplar ve toplamı döndürür. */
export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total = total + item.price, 0);
/**
 Redux slice'ın azaltıcısını (reducer) dışa aktarır. 
 Bu, Redux store'da bu slice'ı kullanmak için gereklidir.
 */
export default cartSlice.reducer;
