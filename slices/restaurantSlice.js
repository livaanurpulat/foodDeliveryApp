import {createSlice} from '@reduxjs/toolkit'

const initialState={
  restaurant: null,
}

export const restaurantSlice = createSlice({
  name:'restaurant',
  initialState,
  reducers:{
    /**
    reducers nesnesi içinde, setRestaurant adlı bir action creator tanımlıyoruz. 
    Bu action creator, restaurant bilgisini güncellemek için kullanılacak eylemi temsil eder. 
    state ve action parametrelerini alır ve state.restaurant alanını action.payload ile günceller. 
    action.payload, action yaratılırken iletilen veriyi içerir.
     */
    setRestaurant: (state,action) => {
      state.restaurant = action.payload;
    },
  },
})

export const {setRestaurant} = restaurantSlice.actions;
/**
 state.restaurant.restaurant;: Bir selektör (selector) fonksiyonunu dışa aktarıyoruz. 
 Bu selektör, Redux store'dan restaurant alanını seçer ve döndürür. 
 Bu, Redux store içindeki restaurant bilgisine erişmek için kullanılır.
 */
export const selectRestaurant = state => state.restaurant.restaurant;
export default restaurantSlice.reducer;
