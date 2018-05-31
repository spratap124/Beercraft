<template>
    <div class="container container-main">
        <div class="container">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="row">
                      
                        <div class="col-md-12 pull-right">
                            <form class="navbar-form navbar-left pull-left">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Search" v-model="search">
                                </div>
                            </form>
                            <div class="showing-filter">
                              <span class="showing">Showing:</span> <span>{{currentFilter}}</span>
                              
                            </div>
                            <!-- <div class="reset-filter">
                                <button type="button" class="btn btn-warning">Reset filters</button>
                            </div> -->
                            <ul class="nav navbar-nav navbar-right">
                                
                                <li class="dropdown">
                                  <a class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span class="filter-text">Alcoholic Content</span>  <span class="filter-icon icon-sort"></span>
                                    <div class="caret text-center"></div>
                                  </a>
                                  <ul class="dropdown-menu type-list" aria-labelledby="dropdownMenu1">
                                    <li @click="sortBy('low')"><a href="#">Low to high <span class="glyphicon glyphicon-sort-by-attributes"></span> </a></li>
                                    <li @click="sortBy('high')"><a href="#">High to low <span class="glyphicon glyphicon-sort-by-attributes-alt"></span></a></li>
                                  </ul>
                                </li>
                                <!-- Type filter -->
                                <li class="dropdown">
                                  <a class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span class="filter-text">Type</span>  <span class="filter-icon icon-type"></span>
                                    <div class="caret"></div>
                                  </a>
                                  <ul class="dropdown-menu type-list" aria-labelledby="dropdownMenu1">
                                    <li @click="changeCurrentFilter('All')"><a href="#">All</a></li>
                                    <li v-for="type in getTypeList" :key="type" @click="changeCurrentFilter(type)"><a href="#">{{type}}</a></li>
                                  </ul>
                                </li>
                                <!-- ABV filter -->
                                <li class="dropdown">
                                  <a class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span class="filter-text">ABV</span>  <span class="filter-icon icon-abv"></span>
                                    <div class="caret"></div>
                                  </a>
                                  <ul class="dropdown-menu type-list" aria-labelledby="dropdownMenu1">
                                    <li @click="changeABVFilter('Light')"><a href="#">Light beers</a></li>
                                    <li @click="changeABVFilter('Strong')"><a href="#">Strong beers</a></li>
                                    <li @click="changeABVFilter('ExStrong')"><a href="#">Extra Strong beers</a></li>
                                  </ul>
                                </li>
                                <!-- size filter -->
                                <li class="dropdown">
                                  <a class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span class="filter-text">Size</span>  <span class="filter-icon icon-size"></span>
                                    <div class="caret"></div>
                                  </a>
                                  <ul class="dropdown-menu type-list" aria-labelledby="dropdownMenu1">
                                    <li @click="changeSizeFilter('12')"><a href="#">Small bottles for one</a></li>
                                    <li @click="changeSizeFilter('16')"><a href="#">To Share</a></li>
                                  </ul>
                                </li>
                            </ul>
                        </div>
                        <!-- Collect the nav links, forms, and other content for toggling -->
                    </div>
                    <!-- /.navbar-collapse -->
                </div>
                <!-- /.container-fluid -->
                </nav>

            <div id="products" class="row list-group">
                <!-- loop the products -->
                <Product v-for="beer in filterredBeers" :beer="beer" :key="beer.id" ></Product>
                
            </div>
        </div>
        <div class="col-md-6 col-md-offset-6">
            <pagination v-bind:currentPage="currentPage" v-on:updatePage="changePage($event)"></pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pdList: [],
      search:"",
      currentFilter: "All",
      currentABVFilter: "",
      sizeFilter:"",
      currentPage: 1,
      beersPerPage: 20,
      totalBeers: 0,
      totalPages: 0 // will be calculated after api response
    };
  },
  methods: {
    changePage: function(updatedPage) {
      this.currentPage = updatedPage;
    },
    changeCurrentFilter:function(type){
      this.currentFilter = type;
    },
    changeABVFilter:function(type){
      this.currentABVFilter = type;
      this.currentFilter = "other";
    },
    changeSizeFilter:function(size){
      this.sizeFilter = size;
      this.currentFilter = "other";
    },
    sortBy:function(criteria){
      if(criteria=='low'){
        this.pdList.sort(function(a,b){
          return a.abv -  b.abv;
        });
      }else{
        this.pdList.sort(function(a,b){
          return b.abv -  a.abv;
        });
      }
    }
  },
  computed: {
    filterredBeers: function() {
      var self = this;

      //for searching
      if(this.search.length > 0){
        console.log("searching");
          return self.pdList.filter(function(beer) {

              return beer.name.toString().toLowerCase().includes(self.search.toLowerCase());
              
          }).filter(function(row,index){
              //for pagination
              if (self.currentPage >= self.totalPages) {
                      self.currentPage = Math.max(0, self.totalPages - 1);
                  }
                  var start = self.beersPerPage * (self.currentPage - 1);
                  var end = self.beersPerPage * self.currentPage;
                  if(index >= start && index < end) return true;
          });
      }
      else{
        //filter by type
        if (self.currentFilter === "All") {
        return self.pdList.filter(function(row, index) {
          //for pagination
          if (self.currentPage >= self.totalPages) {
            self.currentPage = Math.max(0, self.totalPages - 1);
          } else if (self.currentPage == 0) {
            self.currentPage = Math.min(1, self.totalPages - 1);
          } else {
            var start = self.beersPerPage * (self.currentPage - 1);
            var end = self.beersPerPage * self.currentPage;
            if (index >= start && index < end) return true;
          }
        });
      }
      else if(this.currentABVFilter.length == 0 && this.sizeFilter.length == 0){
        return self.pdList.filter(function(beer) {
                   return self.currentFilter === beer.style;
                }).filter(function(row,index){
                    //for pagination
                    if (self.currentPage >= self.totalPages) {
                            self.currentPage = Math.max(0, self.totalPages - 1);
                        }
                        var start = self.beersPerPage * (self.currentPage - 1);
                        var end = self.beersPerPage * self.currentPage;
                        if(index >= start && index < end) return true;
                });
      }
      // filter by size
      else if(self.sizeFilter.length != 0){
        return self.pdList.filter(function(beer) {
            return self.sizeFilter == beer.ounces;
        }).filter(function(row,index){
                    //for pagination
                    if (self.currentPage >= self.totalPages) {
                            self.currentPage = Math.max(0, self.totalPages - 1);
                        }
                        var start = self.beersPerPage * (self.currentPage - 1);
                        var end = self.beersPerPage * self.currentPage;
                        if(index >= start && index < end) return true;
                });
      }

      }
    },
    getTypeList: function() {
      return this.$store.state.filterByTypeList;
    }
  },
  created() {
    //get pdList from store
      this.pdList = this.$store.state.pdList;
      this.totalBeers = this.pdList.length;
      this.totalPages = Math.ceil(this.totalBeers / this.beersPerPage);
      this.loading = this.$store.state.loading;
  }
};
</script>

<style scoped>
.container-main {
  position: relative;
  top: 70px;
}

.navbar-left{
  margin-top: 20px;
}

.navbar-left .form-group {
  width: 300px;
}

.navbar-left .form-group input{
  width: 100%;
}

.fixed {
  position: fixed;
  z-index: 22222;
}
.glyphicon {
  margin-right: 5px;
}
.thumbnail {
  min-height: 350px;
  margin-bottom: 20px;
  padding: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
}

.grid-container {
  padding: 9px;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.item.list-group-item {
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}
.item.list-group-item:nth-of-type(odd):hover,
.item.list-group-item:hover {
  background: #428bca;
}

.item.list-group-item .list-group-image {
  margin-right: 10px;
}
.item.list-group-item .thumbnail {
  margin-bottom: 0px;
}
.item.list-group-item .caption {
  padding: 9px 9px 0px 9px;
}
.item.list-group-item:nth-of-type(odd) {
  background: #eeeeee;
}

.item.list-group-item:before,
.item.list-group-item:after {
  display: table;
  content: " ";
}

.item.list-group-item img {
  float: left;
}
.item.list-group-item:after {
  clear: both;
}
.list-group-item-text {
  margin: 0 0 11px;
}

.caption .game-title {
  font-size: 20px;
  color: #5f5e5e;
}
.title-box {
  margin: 2px 0px;
}

.caption .genre-box {
  margin-top: -7px;
}

.caption .game-ganre {
  color: #616161;
  font-size: 12px;
}
.score-box {
  position: absolute;
  right: 20px;
  top: 0px;
  color: #fff;
}

.score-box .icon-holder {
  font-size: 40px;
}

.score-box .score-holder {
  position: absolute;
  font-size: 10px;
  color: tomato;
  left: 14px;
  top: 23px;
}

.other-details {
  position: absolute;
  bottom: 30px;
}

.filter-icon {
  display: inline-block;
  width: 35px;
  height: 30px;
}
.icon-type{
   background: url("../assets/images/filter_sprites_black.png") -30px 0 no-repeat;
}

.icon-abv{
   background: url("../assets/images/filter_sprites_black.png") -95px 0 no-repeat;
}
.icon-size{
   background: url("../assets/images/size-icon.png") 0 0 no-repeat;
}
.icon-sort{
   background: url("../assets/images/filter_sprites_black.png") -62px 0 no-repeat;
}

.filter-text {
  display: inline-block;
  height: 30px;
  vertical-align: middle;
}

.caret{
    display: block;
    width: 0;
    height: 0;
    margin-left: 30px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid\9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

ul.type-list{
  max-height: 200px;
  overflow: auto;
}

.showing-filter{
  display: inline-block;
  width: 300px;
  margin-top: 28px;
}

.showing-filter .showing{
  font-weight: bold
}

.reset-filter{
  display: inline-block;
}
</style>