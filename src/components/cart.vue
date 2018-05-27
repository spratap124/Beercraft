<template>
    
  <div class="shopping-cart">
    <div class="shopping-cart-header">
      <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">{{getCartCount}}</span>
      <div class="shopping-cart-total">
        <span class="glyphicon glyphicon-trash" @click="emptyCart"></span>
        <span class="lighter-text">Total:</span>
        <span class="main-color-text">{{getCartTotal}}</span>
      </div>
    </div> <!--end shopping-cart-header -->

    <ul class="shopping-cart-items" v-if="cart.length !=0">
      <li class="clearfix" v-for="item in cart" :key="item.details.key">
        <img src="../assets/images/beer_thumbnail.jpg" alt="item1" />
        <span class="item-name">{{item.details.name}}</span>
        <span class="item-price">${{item.details.price}}</span>
        <span class="item-quantity">Quantity: {{item.quantity}}</span>
      </li>
    </ul>

    <h3 class="text-center" v-else>Your cart is empty!</h3>

    <a href="#" class="button">Checkout</a>
  </div> <!--end shopping-cart -->
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    emptyCart:function(){
      this.$store.commit('emptyCart');
    }
  },
  computed: {
    getCartCount: function() {
      return this.$store.getters.getCartItemCount;
    },
    getCartTotal: function() {
      return this.$store.getters.getCartTotal;
    },
    cart: function() {
      return this.$store.getters.getCart;
    }
  }
};
</script>

<style scoped>
.lighter-text {
  color: #abb0be;
}
.glyphicon{
  color: #515783;
  margin-right: 20px;
  cursor: pointer;
}

.main-color-text {
  color: #6394f8;
}

nav {
  padding: 20px 0 40px 0;
  background: #f8f8f8;
  font-size: 16px;
}
nav .navbar-left {
  float: left;
}
nav .navbar-right {
  float: right;
}
nav ul li {
  display: inline;
  padding-left: 20px;
}
nav ul li a {
  color: #777777;
  text-decoration: none;
}
nav ul li a:hover {
  color: black;
}

.container {
  margin: auto;
  width: 80%;
}

.badge {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}

.shopping-cart {
  margin: 20px 0;
  float: right;
  background: white;
  width: 320px;
  position: relative;
  border-radius: 3px;
  padding: 12px;
  -webkit-box-shadow: 0px 2px 9px 0px #000000;
  box-shadow: 0px 2px 9px 0px #000000;
}
.shopping-cart .shopping-cart-header {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 15px;
}
.shopping-cart .shopping-cart-header .shopping-cart-total {
  float: right;
}
.shopping-cart .shopping-cart-items {
  padding: 20px;
  list-style-type: none;
  max-height: 300px;
  overflow: auto;
}
.shopping-cart .shopping-cart-items li {
  margin-bottom: 18px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e8e8e8;
}
.shopping-cart .shopping-cart-items img {
  float: left;
  margin-right: 12px;
  width: 70px;
}
.shopping-cart .shopping-cart-items .item-name {
  display: block;
  padding-top: 10px;
  font-size: 16px;
}
.shopping-cart .shopping-cart-items .item-price {
  color: #6394f8;
  margin-right: 8px;
}
.shopping-cart .shopping-cart-items .item-quantity {
  color: #abb0be;
}

.shopping-cart:after {
  bottom: 100%;
  left: 89%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: white;
  border-width: 8px;
  margin-left: -8px;
}

.cart-icon {
  color: #515783;
  font-size: 24px;
  margin-right: 7px;
  float: left;
}

.button {
  background: #fabd0f;
  color: #262424;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  display: block;
  border-radius: 3px;
  font-size: 16px;
  margin: 25px 0 15px 0;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>