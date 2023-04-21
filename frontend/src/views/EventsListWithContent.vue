<template>
  <div class="row">
    <!-- Esemény lista -->
    <div class="col-md-20">
      <h1>{országnév} történelme</h1>
      <table class="table table-secondary table-hover">
        <thead>
          <tr>
            <th scope="col">Dátum</th>
            <th scope="col">Esemény</th>
            <th scope="col">Forrás</th>
            <th scope="col">Részletek</th>
            <th scope="col">Szerkesztés</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">1</th>
            <td>Ohh nekem úgyis minden mindegy már.</td>
            <td>Aha</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
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
      console.log(this.countries[0].name);
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
