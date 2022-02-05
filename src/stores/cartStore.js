import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';

const status = statusStore();

export default defineStore('cartStore', {
  state: () => ({
    cart: {},
  }),
  actions: {
    addToCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      status.cartLoadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((response) => {
        // axiosMessageState(response, '加入購物車');
        status.pushMessage({ title: '加入購物車' });
        console.log(response);
        status.cartLoadingItem = '';
        this.getCart();
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      status.isLoading = true;
      axios.get(url).then((response) => {
        this.cart = response.data.data;
        console.log(response);
        status.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      status.isLoading = true;
      status.cartLoadingItem = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios.put(url, { data: cart }).then((response) => {
        console.log(response);
        this.getCart();
        status.pushMessage({ title: '更新購物車資訊', content: response.data.message });
        status.cartLoadingItem = '';
        status.isLoading = false;
      });
    },
    removeCartItem(id) {
      status.cartLoadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      status.isLoading = true;
      axios.delete(url).then((response) => {
        console.log(response);
        status.pushMessage({ title: '移除購物車品項', content: response.data.message });
        status.cartLoadingItem = '';
        this.getCart();
        status.isLoading = false;
      });
    },
  },
});
