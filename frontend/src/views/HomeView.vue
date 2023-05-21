<template>
  <div class="my-countrybackgroundrendezes">
    <center>
      <h1 class="mb-5">Válasszon országot!</h1>
      <button
        type="button"
        class="btn btn-success btn-lg mb-3 mt-5"
        v-if="storeLogin.loginSuccess"
        @click="onClickNewCountry()"
      >
        Új ország felvétele
      </button>
    </center>

    <div class="row row-cols-1 row-cols-md-4 g-4 ms-4 me-5 ps-3 pe-5 my-p">
      <div
        class="col"
        v-for="(country, index) in countries"
        :key="`country${index}`"
      >
        <div class="card border-0 my-card h-100 mt-5" style="width: 170px;">
          

            <img
            :src="`../../public/${country.name}.png`"
            class="card-img-top my-border"
            id="my-image"
            alt="..."
            />
            
            <button
            type="button"
            class="btn btn-danger my-deletebtn"
            v-if="storeLogin.loginSuccess"
            >
            <i class="bi bi-x-circle" @click="onClickDelete(country.id)"></i>
          </button>
        
          <div class="card-body">
            <h5 class="card-title text-center my-countryname">
              {{ country.name }}
            </h5>
            <h6 class="card-title text-center">{{ country.region }}</h6>

            <div class="text-center">
              <router-link
                :to="`/EventsListWithContent/${country.id}`"
                class="btn btn-dark"
                >Kiválasztás</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--#region Modal -->
    <div
      class="modal fade"
      id="modalEvent"
      tabindex="-1"
      aria-labelledby="modalCarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ stateTitle }}
            </h1>
            <button
              type="button"
              class="btn-close"
              @click="onClickCancel()"
              aria-label="Close"
            ></button>
          </div>

          <!--#region Modal body -->
          <div class="modal-body p-3">
            <!-- Cím -->
            <h1>Új ország felvétele</h1>
            <!-- Ország adatainak kitöltése -->
            <div>
              <!-- Ország neve  -->
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Ország neve</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  required
                  v-model="newCountry.name"
                />
              </div>
              <!-- Ország régiója -->
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Ország régiója</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="region"
                  v-model="newCountry.region"
                />
              </div>
              <!-- Ország zászlaja -->
              <!-- <div class="mb-3">
                <label for="formFile" 
                class="form-label"
                :src="`../../public/${newCountry.name}.png`"
                  >Ország zászlajának feltöltése</label
                >
                <input class="form-control" type="file" id="formFile" />
              </div> -->
            </div>
          </div>

          <!--#endregion Modal body -->

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="onClickCancel()"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="onClickSave()"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--#endregion Modal -->

    <!-- delete country confirmation -->
    <Menu></Menu>
    <YesNoCountry
      v-if="yesNoShow"
      yesNoTitle="Ország törlés"
      yesNoMessage="Biztos törölni szeretné az országot? (A törlés végleges)"
      @yes="onClickDeleteOK()"
      @no="onClickDeleteCancel()"
    ></YesNoCountry>
  </div>
</template>

<script>
import YesNoCountry from "../components/YesNoCountry.vue";
import * as bootstrap from "bootstrap";
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();

class Country {
  constructor(id = 0, name = null, region = null, flag = []) {
    this.id = id;
    this.name = name;
    this.region = region;
    this.flag = flag;
  }
}

export default {
  components: {
    YesNoCountry,
  },
  data() {
    return {
      state: "view",
      currendId: null,
      storeUrl,
      storeLogin,
      countries: [],
      newCountry: new Country(),
      yesNoShow: false,
    };
  },
  mounted() {
    this.getCountries();

    this.modal = new bootstrap.Modal(document.getElementById("modalEvent"), {
      keyboard: false,
    });
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
    async postCountry() {
      let url = this.storeUrl.urlCountries;
      const body = JSON.stringify(this.newCountry);
      const config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
        body: body,
      };
      const response = await fetch(url, config);
      this.getCountries();
    },
    async onClickNewCountry() {
      this.state = "new";
      this.currendId = null;
      this.newCountry = new Country();
      this.modal.show();
    },

    async deleteCountry(id) {
      let url = `${this.storeUrl.urlCountries}/${id}`;
      const config = {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      this.getCountries();
    },
    onClickCancel() {
      this.modal.hide();
    },
    onClickSave() {
      this.postCountry();
      this.modal.hide();
    },
    onClickDelete(id) {
      this.state = "delete";
      this.yesNoShow = true;
      this.currendId = id;
    },
    onClickDeleteOK() {
      this.deleteCountry(this.currendId);
      this.yesNoShow = false;
    },
    onClickDeleteCancel() {
      this.yesNoShow = false;
    },
  },
};
</script>

<style scoped>
#my-image {
  max-height: 120px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 170px;
  height: 120px;
  margin-top: auto;
  margin-bottom: auto;
}

.my-border {
  border: 2px solid black;
}

.my-countryname{
  font-size: 20.6px;
  font-weight: bold;
}

.my-p{
  padding-left: 150px !important;
}

.my-flag{
  position: relative;
  width: 170px;
}

.my-deletebtn {
  position: absolute;
  right: 0;
  top: -10px;
  left: 30px;
  width: 30px;
  border-radius: 100%;
  padding: 1px;           
  margin-left: 73%;
  height: 30px;
  bottom: 43%;
}

.my-card {
  background-color: rgba(255, 255, 255, 0);
}
.my-gap {
  margin: -30px;
}
</style>
