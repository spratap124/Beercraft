import Vue from 'vue'
import App from './App.vue'
//central store
import { store } from './store/store'

// import VueResource from 'vue-resource'

//components
import header from './components/header.vue';
import productList from './components/productList.vue'
import product from './components/product.vue'
import pagination from './components/pagination.vue'
import cart from './components/cart.vue'



//register components
Vue.component('Header', header);
Vue.component('ProductList', productList);
Vue.component('Product', product);
Vue.component('pagination', pagination);
Vue.component('cart', cart);

// Vue.use(VueResource);

new Vue({
  store:store,
  el: '#app',
  render: h => h(App)
})
