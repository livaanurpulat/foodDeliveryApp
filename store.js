import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import restaurantSlice from './slices/restaurantSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: restaurantSlice
  },
})

/*Redux Slice'lar, bir reducer'ı ve bu reducer'ı güncellemek için kullanılan eylem yaratıcılarını içerir. 
Yani, bir Redux Slice içindeki reducer, sadece o Slice'ın yönettiği verileri günceller.
configureStore içinde birden fazla reducer kullanıyorsak, bu reducer'lar farklı parçaları (örneğin, cartSlice ve restaurantSlice) yönetir. 
Bu nedenle, her bir parça için ayrı bir Slice ve ayrı bir reducer tanımlanır.
Her bir Slice içindeki reducer, yalnızca ilgili parçanın durumunu güncellemek için kullanılır. 
Örneğin, cartSlice içindeki reducer, sepet durumu için kullanılır ve restaurantSlice içindeki reducer, restoran bilgileri durumu için kullanılır.
Sonuç olarak, birden fazla parça veya veri parçası olduğunda, bu verileri ayrı ayrı yönetmek ve güncellemek için Redux Slice'lar ve reducer'lar kullanılır. 
Ardından, configureStore içinde bu reducer'ları bir araya getirerek tüm uygulama durumunu yönetmek için kullanabilirsiniz. 
Bu yaklaşım, Redux uygulamalarını modüler ve düzenli hale getirmenize yardımcı olur.*/