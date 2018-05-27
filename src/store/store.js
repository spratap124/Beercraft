import Vue from 'vue'
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);


export const store = new Vuex.Store({
    state: {
        pdList: [],
        loading: true,
        filterByTypeList:[],
        cart:[],
        cartItemCount:0
    },
    actions: {
        loadData({commit}) {
            Vue.http.get('http://starlord.hackerearth.com/beercraft').then(function (data) {
                commit('updatePosts', data.body);
                commit('changeLoadingState', false);
                commit('populateFilterByTypeList');
            });

        }
    },  
    mutations: {
        updatePosts(state, data) {
            state.pdList = data;
        },
        changeLoadingState(state, loading) {
            state.loading = loading;
        },
        populateFilterByTypeList(state){
            state.pdList.forEach(function(pd) {
                var getIndex = state.filterByTypeList.indexOf(pd.style);
                if(getIndex == -1){
                    state.filterByTypeList.push(pd.style);
                }
            });
        },
        addToCart(state, beer) {
            const locationInCart = state.cart.findIndex(f => {
                return f.details.id === beer.id;
            });

            if (locationInCart === -1) {
                state.cart.push({
                    details: beer,
                    quantity: 1
                });
            } else {
                state.cart[locationInCart].quantity++
            }
        },
        emptyCart(state){
            state.cart = [];
        }
       
    },
    getters:{
        getCartItemCount(state) {
            var cartCount = 0;
            if (state.cart.length != 0) {
                state.cart.forEach(function (item) {
                    cartCount += item.quantity;
                });
                return cartCount;
            } else {
                return cartCount;
            }
        },
        getCartTotal(state){
            var total = 0;
            if (state.cart.length != 0) {
                state.cart.forEach(function (item) {
                    total += item.quantity * item.details.price;
                });
                return total;
            } else {
                return total;
            }
        },
        getCart(state) {
            return state.cart;
        }

    }
});
