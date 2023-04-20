<template>
  <div>
    <center><h1>Válassz országot!</h1></center>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card border-0 h-100">
          <img
            src="../../Images/ZaszloMagyarorszag.png"
            class="card-img-top"
            id="my-image"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-center">Magyarország</h5>
            <a href="#" class="btn btn-dark my-button">Kiválasztás</a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card border-0 h-100">
          <img
            src="../../Images/ZaszloNemet.png"
            class="card-img-top"
            id="my-image"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-center">Németország</h5>
            <a href="#" class="btn btn-dark my-button">Kiválasztás</a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card border-0 h-100">
            <img
            src="../../Images/ZaszloUSA.png"
            class="card-img-top"
            id="my-image"
            alt="..."
            />
          <div class="card-body">
            <h5 class="card-title text-center">Amerikai Egyesült Államok</h5>
            <a href="#" class="btn btn-dark my-button">Kiválasztás</a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card border-0 h-100">
            <img
            src="../../Images/ZaszloUSA.png"
            class="card-img-top"
            id="my-image"
            alt="..."
            />
          <div class="card-body">
            <a href="#" class="btn btn-dark my-button">Kiválasztás</a>
          </div>
        </div>
      </div>

      


    </div>
  </div>
</template>

<script setup>
import Counter from "@/components/Counter.vue";
import { useCounterStore } from "@/stores/counter";
const storeCounter = useCounterStore();
</script>

<style>
.my-button{
  margin-left: 121px;
}

#my-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 50%;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
