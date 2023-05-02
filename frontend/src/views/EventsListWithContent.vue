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
            <th scope="col">
              <button
                type="button"
                class="btn btn-success btn-sm my-button-width"
                v-if="storeLogin.loginSuccess"
                @click="onClickNewEvent()"
              >
                Új esemény
              </button>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(event, index) in country.events" :key="`country${index}`">
            <td class="text-nowrap" id="my-date" scope="row">
              {{ event.dateFrom }} - {{ event.dateTo }}
            </td>
            <td>{{ event.eventName }}</td>
            <!-- Forrás link -->
            <td>
              <a
                :href="event.link"
                type="button"
                class="btn btn-primary btn-sm"
                target="_blank"
                >Forrás</a
              >
            </td>
            <!-- Részletek -->
            <td>
              <button
                type="button"
                class="btn btn-primary btn-sm my-button-width"
                @click="onClickDetails(event.id)"
              >
                <span v-if="storeLogin.loginSuccess">Szerkesztés</span>
                <span v-if="!storeLogin.loginSuccess">Részletek</span>
              </button>
            </td>
            <!-- Esemény törlése -->
            <td>
              <button
                type="button"
                v-if="storeLogin.loginSuccess"
                class="btn btn-danger btn-sm"
                @click="onClickDelete(event.id)"
              >
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--#region Modal -->
    <div
      class="modal fade"
      id="modalEvent"
      tabindex="-1"
      aria-labelledby="modalCarModalLabel"
      aria-hidden="true"
      data-bs-focus="false"
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
            <!-- Részletek szerkesztése -->
            <div v-show="storeLogin.loginSuccess" class="row">
              <!-- Event name -->
              <div class="mb-3 col-md-8">
                <label for="eventName" class="form-label">Esemény neve</label>
                <input
                  type="text"
                  class="form-control"
                  id="eventName"
                  v-model="event.eventName"
                />
              </div>

              <div class="mb-3 col-md-2">
                <label for="dateFrom" class="form-label">évszámtól</label>
                <input
                  type="number"
                  class="form-control"
                  id="dateFrom"
                  v-model="event.dateFrom"
                />
              </div>
              <div class="mb-3 col-md-2">
                <label for="dateTo" class="form-label">évszámig</label>
                <input
                  type="number"
                  class="form-control"
                  id="dateTo"
                  v-model="event.dateTo"
                />
              </div>
              <div class="mb-3 col-12">
                <label for="link" class="form-label">Forrás</label>
                <input
                  type="text"
                  class="form-control"
                  id="link"
                  v-model="event.link"
                />
              </div>
              <div>
                <main id="sample">
                  <Editor
                    v-model="event.description"
                    api-key="2sunwstf5wgpgg17zlpewi8k80e6k3udiopxeqwk6tidxklg"
                    :init="{
                      plugins: 'lists link image table code help wordcount',
                    }"
                  />
                </main>
              </div>
            </div>
            <!-- Részletek megmutatása -->
            <div v-if="!storeLogin.loginSuccess">
              <h2>{{ event.eventName }}</h2>
              <p>"{{ event.dateFrom }} - {{ event.dateTo }}</p>
              <p><a :href="event.link">Forrás</a></p>
              <div v-html="event.description"></div>
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
              @click="onClickSave(event.id)"
              v-if="storeLogin.loginSuccess"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--#endregion Modal -->
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";
import Editor from "@tinymce/tinymce-vue";

class Country {
  constructor(id = 0, name = null, region = null) {
    this.id = id;
    this.name = name;
    this.region = region;
  }
}

class Event {
  constructor(
    id = 0,
    eventName = null,
    description = null,
    dateFrom = null,
    dateTo = null,
    countryId = null
  ) {
    this.id = id;
    this.eventName = eventName;
    this.description = description;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.countryId = countryId;
  }
}

import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();
export default {
  components: {
    Editor,
  },
  data() {
    return {
      storeUrl,
      storeLogin,
      country: new Country(),
      event: new Event(),
      state: "view",
      currentId: null,
    };
  },
  mounted() {
    this.getEvents();
    this.getCountryWithEvents();
    tinymce.init({
      selector: "textarea.classic",
    });

    this.modal = new bootstrap.Modal(document.getElementById("modalEvent"), {
      keyboard: false,
    });
    // this.form = document.querySelector(".needs-validation");
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

    async putEvent(id) {
      let url = `${this.storeUrl.urlEvents}/${id}`;
      const body = JSON.stringify(this.event);
      const config = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
        body: body,
      };
      console.log(url);
      const response = await fetch(url, config);
      this.getCountryWithEvents();
    },

    async getEventsById(id) {
      let url = `${this.storeUrl.urlEvents}/${id}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.event = data.data[0];
    },

    //CRUD törlés kísérlet
    async deleteEvent(id) {
      let url = `${this.storeUrl.urlEvents}/${id}`;
      const config = {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      this.getCountryWithEvents();
    },

    onClickDelete(id) {
      this.state = "delete";
      this.deleteEvent(id);
      this.currentId = null;
    },
    //CRUD törlés kísérlet vége

    onClickNewEvent() {
      console.log("Új esemény felvitele.");
      this.modal.show();
    },
    onClickDetails(id) {
      console.log("Részletek", id);
      this.getEventsById(id);
      this.modal.show();
    },
    onClickCancel() {
      this.modal.hide();
    },
    onClickSave(id) {
      this.putEvent(id);
      this.modal.hide();
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

.my-button-width {
  width: 100px;
}
</style>
