<template>
  <div>
    <center><h1>Válassz országot!</h1></center>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col"
      v-for="(country,index) in countries" :key="`country${index}`"
      >
        <div class="card border-0 h-100">
          <img
            :src="`../../public/${country.name}.png`"
            class="card-img-top my-border"
            id="my-image"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-center">{{ country.name }}</h5>
            <router-link :to="`/EventsListWithContent/${country.id}`" class="btn btn-dark my-button">Kiválasztás</router-link>
          </div>
        </div>
      </div>

    </div>     


  </div>
</template>

<script>
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();
export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      countries: [],
    };
  },
  mounted() {
    this.getCountries();
  },
  methods: {
    async getCountries() {
      let url = this.storeUrl.urlCountries;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.countries = data.data;
    },
  },
};
</script>

<style>
.my-button {
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

.my-border{
  border: 1px solid black;
}
</style>
