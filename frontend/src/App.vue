<template>
  <div>
      <img src="../public/KeretKisebb.jpg" alt="keret" class="my-backgroundimage">
      <img src="../public/KeretKisebb.jpg" alt="keret" class="my-backgroundimageRight">
      
      <div class="container-fluid my-container p-0">
        
        <!-- Carousel -->
        <Carousel />
        <!-- Menü -->
        <Menu />
        <RouterView class="my-countrybackground" />
      </div>
    </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Menu from '@/components/Menu.vue'
// import { useUrlStore } from "./stores/url";
// const storeUrl = useUrlStore();

export default {
  components: { Carousel, Menu},


}
</script>

<style>

.my-backgroundimageRight{
  transform: rotate(-180deg);
  position: fixed;
  top: 0;
  left: 70%;
  width: 30%;
  height: 100%;
  z-index: -1;
}

.my-backgroundimage{
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  z-index: -1;
}


.my-countrybackground{  
  background-image: url("../public/CountryBackgroundWHITE.jpg");
  background-size: cover;
  height: 1200px;
}
</style>