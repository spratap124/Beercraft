<template>
  <div class="item  col-xs-6 col-md-3 col-md-3 col-lg-3">
        <div class="thumbnail">
            <img class="group list-group-image" src="../assets/images/beer_thumbnail.jpg" alt="" />
            <div class="caption">
                <div class="title-box">
                    <h5 class="">
                        <span class="beer-name">{{beer.name}}</span>
                    </h5>
                </div>
                
                <div class="other-details col-md-12">
                    <div class="category_table_tile">
                        <div class="col-xs-12 clearfix">
                            <a href="#">{{beer.style}}</a>
                        </div>
                        <div class="col-xs-6 clearfix">
                            <a href="#">{{beer.ibu}}(ibu)</a>
                        </div>
                        <div class="col-xs-3 clearfix text-center bordered">
                            <a href="#">{{beer.abv}}°</a>
                        </div>
                        <div class="col-xs-3 clearfix text-center">
                            <a href="#">{{beer.ounces}}oz</a>
                        </div>
                    </div>
                    <div class="category_price_bottom">
                        <span class="category_current_price_bottom">17.50 € </span>
                    </div>
                    
                </div>
                <div class="col-md-12 text-center">
                    <button type="button" class="btn btn-warning" @click="addToCart(beer)">ADD</button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
  props:['beer'],
  data () {
    return {
      
    }
},
methods:{
    addToCart:function(beer){
        var beerToAdd = {}
        beerToAdd.id = beer.id;
        beerToAdd.name = beer.name;
        beerToAdd.style = beer.style;
        beerToAdd.price = 75;

        this.$store.commit('addToCart',beerToAdd);

    }
}
}
</script>

<style scoped>
.thumbnail {
  min-height: 383px;
  margin-bottom: 20px;
  padding: 0px;
}

.thumbnail > img {
  display: block;
  max-width: 60%;
  height: auto;
}
.title-box {
  text-align: center;
}
.beer-name {
  color: #676767;
}

.category_table_tile {
  display: inline-block;
  float: right;
  min-width: 100%;
  width: 180px;
  text-align: left;
  min-height: 70px;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
}

.category_table_tile div {
  padding: 4px 0 4px 5px;
  border: 1px solid #e1dcd2;
  color: #333;
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
  background: 0 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
}

.category_table_tile div > a {
  color: #5a5550;
}
.category_table_tile div:nth-child(n + 2) {
  border-bottom: 1px solid #e1dcd2;
}
.category_table_tile .bordered {
  border-left: 1px solid #e1dcd2;
  border-right: 1px solid #e1dcd2;
}

.category_price_bottom {
  display: inline-block;
  float: right;
  width: 100%;
  text-align: left;
  color: #5a5550;
  font-family: Akhand_bold;
  font-size: 22px;
  line-height: 22px;
  margin-bottom: 10px;
}
.text-center {
  text-align: center;
}
.add-to-cart-wrapper {
  width: 100%;
}

.btn-warning {
  color: #262424;
  width: 180px;
  background-color: #fabd0f;
  border-radius: 35px;
  border: none;
}
</style>
