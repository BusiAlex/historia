<template>
  <div class="row">
    <!-- Esemény lista -->
    <div class="col-md-20">
      <h1>{{ country.name }} történelme</h1>
      <table class="table table-secondary table-hover w-auto">
        <thead>
          <tr>
            <th scope="col">Mikor</th>
            <th scope="col">Esemény</th>
            <th scope="col">Forrás</th>
            <th scope="col">Részletek</th>
            <th scope="col">Szerkesztés</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(event,index) in country.events" :key="`country${index}`">
            <td class="text-nowrap" scope="row">{{ event.dateFrom }} - {{ event.dateTo }}</td>
            <td>{{ event.eventName }}</td>
            <td>
              <a :href="event.link" type="button" class="btn btn-primary" target="_blank">Forrás</a>
            </td>
            <td><button type="button" class="btn btn-primary">Részletek</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
class Country{
  constructor(name = null, region = null, events = []){
    this.name = name;
    this.region = region;
    this.events = events;
  }
}

import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();
export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      country: new Country(),
      
    };
  },
  mounted() {
    this.getCountryWithEvents();
   
  },
  methods: {
    async getCountryWithEvents() {
      const param = this.$route.params;
      console.log(param);
      const id = param.countryId;
      let url = `${this.storeUrl.urlCountriesWithEvents}/${id}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.country = data.data;
    },
    async getEvents() {
      let url = this.storeUrl.urlEvents;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.events = data.data;
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

.my-border {
  border: 1px solid black;
}
</style>
