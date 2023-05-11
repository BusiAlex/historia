<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light" id="my-navbar">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active my-text0" aria-current="page" to="/"
            :class="{active: menuState === 2}"
            @click="onClickMenu(2)"
              >Ország választó</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link active my-text1" to="/textareatest">Esemény szerkesztő</router-link>
          </li>
          <li class="nav-item" v-if="!storeLogin.loginSuccess">
            <router-link class="nav-link active my-text2" to="/login">Bejelentkezés</router-link>
          </li>
          <li class="nav-item" v-if="storeLogin.loginSuccess" @click="logout()">
            <router-link class="nav-link" to="/login"
              >Kijelentkezés ({{ storeLogin.userName }})</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();

const msg = "helo";
let menuState = null;
async function logout() {
  console.log("logout");
  const urlLogout = storeUrl.urlLogout;
  const body = {
    token: storeLogin.refreshToken,
  };
  const config = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(urlLogout, config);
  storeLogin.clearLogin();
}

function onClickMenu(number){
  this.menuState = number
}
// export default {
//   data() {
//     return {
//       storeUrl,
//       storeLogin
//     }
//   }
// };
</script>

<style>

.my-text0{
  font-family: cursive;
}

.my-text1{
  font-family: cursive;
}

.my-text2{
  font-family: cursive;
}

#my-navbar{
  /* background-color: rgb(255, 249, 193)  !important; */
  background-color: grey !important;
}

/* .router-link-active {
  color: white !important
}

.navbar-nav > li > .dropdown-menu a:link,
.navbar-nav > li > .dropdown-menu a:hover { background-color: black} */
</style>