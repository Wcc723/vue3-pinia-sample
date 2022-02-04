import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      // this.isLoading = true;
      axios.get(url).then((response) => {
        this.products = response.data.products;
        console.log('products:', response);
        // this.isLoading = false;
      });
    },
  },
});
