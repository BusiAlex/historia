<template>
  <div class="my-background">

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

.my-background{
  /* background-image: url("../public/CountryBackground.jpg");
  background-repeat: no-repeat;
  background-size: cover; */

}

.my-countrybackground{  
  background-image: url("../public/CountryBackgroundWHITE.jpg");
  background-size: cover;
}
</style>