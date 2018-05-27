<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar6">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"><img src="../assets/images/beer.svg" class="pull-left">
                    <span class="pull-right brand-name">{{site}}</span> 
                </a>
            </div>
            <div id="navbar6" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="cart" @click="toggleCart"><a href="#"> <span class="glyphicon glyphicon-shopping-cart"></span> Cart <span class="badge">{{getCartCount}}</span></a> </li>
                </ul>
            </div>
            
            <!--/.nav-collapse -->
        </div>
        <!--/.container-fluid -->
    </nav>
</template>

<script>

    export default {
        data(){
            return {
                site: 'Beercraft'
            }
        },
        computed:{
            getCartCount:function(){
               return  this.$store.getters.getCartItemCount;
               
            }
        },
        methods:{
            toggleCart:function(){
               this.$emit('toggleCart');
            }
        }  
    }
</script>

<style>
.navbar-brand{
    width: 150px;
}
.navbar-brand img{
    width: 40px;
    height: 40px;
    margin-top: -10px;
}

.navbar-inverse {
    background-color: #313131;
    border-color: #080808;
}

.navbar-brand .brand-name,
.navbar-inverse .navbar-nav>li>a {
   color:#fabd0fe8;
}

.brand-name:hover{
     color: #ffcc00;
    background-color: transparent;
}

.navbar-inverse .navbar-nav>li>a:focus,
.navbar-inverse .navbar-nav>li>a:hover,
.navbar-inverse .navbar-nav>li>a:active {
    color: #ffcc00;
    background-color: transparent;
}

</style>