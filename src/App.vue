<template>
  <div class="bg-color main-container">
    <Header v-on:toggleCart="toggleCart"></Header>
    <div class="cart-container" v-if="showCart">
        <cart></cart>
    </div>
    <div class="loading" v-if="loading">
       <img src="./assets/images/loading_beer.gif">
    </div>
    <div class="wrapper" v-else>
      <ProductList></ProductList>
    </div>
    
  </div>
  
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      site: "The Beer",
      appName: "Online store to order Crafted Beers.",
      showCart:false
    };
  },
  methods:{
    toggleCart:function(){
      this.showCart = !this.showCart;
    }
  },
  computed: {
    loading: function() {
      return this.$store.state.loading;
    }
  },
  created() {
    this.$store.dispatch("loadData"); // dispatch loading
  }
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  position: relative;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.cart-container {
  position: absolute;
  right: 19%;
  top: 39px;
  z-index: 2222;
 
}
</style>
