import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {v4 as uuid} from 'uuid';

interface CartItem {
  isVeg: boolean;
  id: string;
  name: string;
  price: number;
  quantity: number;
  cartPrice?: number;
  isCustomizable?: boolean;
  customizations?: any[];
}

interface RestaurantDetails {
  id: string;
  name: string;
  discount: string;
  discountAmount: string;
  time: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

interface RestaurantCart {
  restaurant: RestaurantDetails;
  items: CartItem[];
}

interface CartState {
  carts: RestaurantCart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
      }>,
    ) => {
      const {restaurant, item} = action.payload;
      const existingRestaurantCart = state.carts.find(
        cart => cart?.restaurant.id === restaurant?.id,
      );
      if (existingRestaurantCart) {
        const existingItem = existingRestaurantCart?.items?.find(
          cartItem => cartItem?.id === item?.id,
        );
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.cartPrice =
            (existingItem.cartPrice || 0) + existingItem?.price;
        } else {
          existingRestaurantCart?.items?.push({
            ...item,
            quantity: 1,
            cartPrice: item?.price,
          });
        }
      } else {
        state.carts.push({
          restaurant,
          items: [{...item, quantity: 1, cartPrice: item?.price}],
        });
      }
    },

    removeItemFromCart: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
      }>,
    ) => {
      const {itemId, restaurant_id} = action?.payload;
      const restaurantCart = state?.carts?.find(
        cart => cart?.restaurant?.id === restaurant_id,
      );
      if (!restaurantCart) return;

      const itemIndex = restaurantCart.items?.findIndex(
        item => item?.id === itemId,
      );

      if (itemIndex !== -1) {
        const item = restaurantCart?.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.cartPrice = (item.cartPrice || 0) - item?.price;
        } else {
          restaurantCart.items.splice(itemIndex, 1);
        }
      }

      if (restaurantCart.items.length === 0) {
        state.carts = state.carts.filter(
          cart => cart.restaurant.id !== restaurant_id,
        );
      }
    },

    addCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
        customization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        };
      }>,
    ) => {},

    removeCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
        customizationId: string;
      }>,
    ) => {},

    updateCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
        customizationId: string;
        newCustomization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        };
      }>,
    ) => {},

    clearAllCarts: state => {
      state.carts = [];
    },
    clearRestaurantCart: (
      state,
      action: PayloadAction<{restaurant_id: string}>,
    ) => {
      const {restaurant_id} = action.payload;
      state.carts = state.carts.filter(
        cart => cart?.restaurant?.id !== restaurant_id,
      );
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearAllCarts,
  clearRestaurantCart,
  addCustomizableItem,
  removeCustomizableItem,
  updateCustomizableItem,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export const selectRestaurantCart = (restaurantId: string) =>
  createSelector(
    (state: RootState) =>
      state.cart.carts.find(cart => cart.restaurant.id === restaurantId),
    restaurantCart => (restaurantCart ? [...restaurantCart.items] : []),
  );

export const selectRestaurantCartItem = (
  restaurantId: string,
  itemId: string,
) =>
  createSelector(
    (state: RootState) =>
      state.cart.carts.find(cart => cart.restaurant.id === restaurantId)?.items,
    items => items?.find(item => item?.id === itemId) || null,
  );

export default cartSlice.reducer;
